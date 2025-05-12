/**
 * Copyright (c) 2024 shaobeichen <shaobeichen@outlook.com>
 * All rights reserved.
 */

const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

const config = {
  extensionName: 'shaobeichen.gradient-theme',
  tagAttr: 'data-gradient-theme-id',
  // vscode版本的key 用来存在globalState中
  vscodeVersionKey: 'data-gradient-theme-vscode-version',
}

// 插件上下文
let context = null

const appDir = require.main ? path.dirname(require.main.filename) : globalThis._VSCODE_FILE_ROOT
const base = path.join(appDir, 'vs', 'code')
let htmlFile = path.join(base, 'electron-sandbox', 'workbench', 'workbench.html')
// support Cursor IDE
if (!fs.existsSync(htmlFile)) {
  htmlFile = path.join(base, 'electron-sandbox', 'workbench', 'workbench-apc-extension.html')
}
if (!fs.existsSync(htmlFile)) {
  htmlFile = path.join(base, 'electron-sandbox', 'workbench', 'workbench.esm.html')
}
if (!fs.existsSync(htmlFile)) {
  htmlFile = path.join(base, 'electron-browser', 'workbench', 'workbench.esm.html')
}
if (!fs.existsSync(htmlFile)) {
  htmlFile = path.join(base, 'electron-browser', 'workbench', 'workbench.html')
}

const enableCommonMessage = `VSCode must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.`

const prefix = 'extension'
const enableName = 'enable'
const disableName = 'disable'
const enableCommand = prefix + '.' + enableName
const disableCommand = prefix + '.' + disableName

const enableMessage = 'Gradient ' + enableName + 'd. ' + enableCommonMessage
const disableMessage = 'Gradient ' + disableName + 'd. ' + enableCommonMessage

/**
 * 获取重置html后的html内容，删除所有插件插入的style和script
 * @returns
 */
function getResetContent() {
  if (!fs.existsSync(htmlFile)) {
    showMessage('Gradient Theme is not supported on this platform.')
    return ''
  }

  const html = fs.readFileSync(htmlFile, 'utf-8')
  const regex = new RegExp(
    `<style[^>]*${config.tagAttr}[^>]*>.*?</style>|<script[^>]*${config.tagAttr}[^>]*>.*?</script>`,
    'gs',
  )
  const output = html.replace(regex, '')
  return output
}

/**
 * 重置html文件，用于删除所有插件插入的style和script
 */
function reset() {
  if (!fs.existsSync(htmlFile)) {
    showMessage('Gradient Theme is not supported on this platform.')
    return ''
  }

  const output = getResetContent()
  fs.writeFileSync(htmlFile, output, 'utf-8')
}

/**
 * enable命令后，启动主题样式插入逻辑
 */
function install() {
  if (!fs.existsSync(htmlFile)) {
    showMessage('Gradient Theme is not supported on this platform.')
    return ''
  }

  const themeConfig = vscode.workspace.getConfiguration('gradientTheme')
  const css = themeConfig ? themeConfig.css : []
  const customCssOutHtml = css
    .filter((item) => item.enable)
    .reduce((prev, cur) => {
      return (
        prev +
        `
    <style ${config.tagAttr}>
    ${cur.css}
    </style>
    `
      )
    }, '')

  const distIndexHtmlFile = path.join(__dirname, '../dist/index.html')
  const html = getResetContent()
  const styleHtml = fs.readFileSync(distIndexHtmlFile, 'utf-8')
  const output = html.replace('</html>', '') + customCssOutHtml + styleHtml + '</html>'
  fs.writeFileSync(htmlFile, output, 'utf-8')
  showReloadMessage(enableMessage)

  updateGlobalStateVscodeVersion()
}

/**
 * uninstall命令后，重置html文件
 */
function uninstall() {
  reset()

  showReloadMessage(disableMessage)
}

/**
 * 注册命令
 * 注册enableCommand和disableCommand命令
 */
function registerCommand() {
  const disposable = vscode.commands.registerCommand(enableCommand, install)
  const disable = vscode.commands.registerCommand(disableCommand, uninstall)
  context.subscriptions.push(disposable)
  context.subscriptions.push(disable)
}

/**
 * 显示重启提示，点击重启后会自动重启vscode
 * @param {*} message
 */
function showReloadMessage(message) {
  vscode.window
    .showInformationMessage(message, { title: 'Restart editor to complete' })
    .then(function (msg) {
      vscode.commands.executeCommand('workbench.action.reloadWindow')
    })
}

/**
 * 显示提示（多用于打印日志）
 * @param {*} message
 */
function showMessage(message) {
  vscode.window.showInformationMessage(message)
}

/**
 * 更新全局状态
 * @param {*} key
 * @param {*} value
 */
function updateGlobalState(key, value) {
  context.globalState.update(key, value)
}

/**
 * 获取全局状态
 * @param {*} key
 * @returns
 */
function getGlobalState(key) {
  return context.globalState.get(key)
}

/**
 * 状态中获取vscode版本
 * 举例：data-gradient-theme-vscode-version 1.100.0
 */
function getGlobalStateVscodeVersion() {
  return getGlobalState(config.vscodeVersionKey)
}

/**
 * 往状态中存vscode版本
 */
function updateGlobalStateVscodeVersion() {
  const vscodeVersion = vscode.version.split('-')[0]
  updateGlobalState(config.vscodeVersionKey, vscodeVersion)
}

/**
 * 状态中删vscode版本
 */
function removeGlobalStateVscodeVersion() {
  updateGlobalState(config.vscodeVersionKey, '')
}

/**
 * 是否在过往安装过插件
 * 注意：卸载插件，卸载vscode，全局状态会消失
 */
function isInstalledInThePast() {
  return getGlobalStateVscodeVersion()
}

/**
 * 初始化通过vscode版本判断是否需要自动提示重启
 *
 * 通过vscode版本判断实现vscode更新后能自动提示重启并启动渐变
 * （背景：vscode一更新，html里的东西会被清空，导致每次更新都要手动启动命令，麻烦）
 */
function initGlobalStateVscodeVersion() {
  const realVscodeVersion = vscode.version.split('-')[0]
  const htmlVscodeVersion = getGlobalStateVscodeVersion()
  // 如果过去安装过插件，并且vscode版本不一致（代表vscode更新了），就重新提示安装提醒，点击重启就能安装插件
  if (realVscodeVersion !== htmlVscodeVersion && isInstalledInThePast()) {
    install()
  }
}

function activate(ctx) {
  this.extensionName = config.extensionName
  this.context = ctx
  context = ctx
  registerCommand()
  initGlobalStateVscodeVersion()
}

exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
