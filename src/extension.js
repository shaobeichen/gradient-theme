const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

const isWin = /^win/.test(process.platform)
const appDir = path.dirname(require.main.filename)
const base = appDir + (isWin ? '\\vs\\code' : '/vs/code')
const electronBase = isVSCodeBelowVersion('1.70.0') ? 'electron-browser' : 'electron-sandbox'
const htmlFile =
  base +
  (isWin
    ? '\\' + electronBase + '\\workbench\\workbench.html'
    : '/' + electronBase + '/workbench/workbench.html')

const enableCommonMessage = `VS code must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.`

function isVSCodeBelowVersion(version) {
  const vscodeVersion = vscode.version
  const vscodeVersionArray = vscodeVersion.split('.')
  const versionArray = version.split('.')

  for (let i = 0; i < versionArray.length; i++) {
    if (vscodeVersionArray[i] < versionArray[i]) {
      return true
    }
  }

  return false
}

function showReloadMessage(message) {
  vscode.window
    .showInformationMessage(message, { title: 'Restart editor to complete' })
    .then(function (msg) {
      vscode.commands.executeCommand('workbench.action.reloadWindow')
    })
}

function registerCommand(context, name, filename) {
  const prefix = 'extension'
  const enablePrefix = 'enable'
  const disablePrefix = 'disable'
  const enableCommand = prefix + '.' + enablePrefix + name
  const disableCommand = prefix + '.' + disablePrefix + name

  const enableMessage = name + ' ' + enablePrefix + 'd. ' + enableCommonMessage
  const disableMessage = name + ' ' + disablePrefix + 'd. ' + enableCommonMessage

  const tagAttr = 'data-gradient-theme-id'

  const disposable = vscode.commands.registerCommand(enableCommand, function () {
    const html = fs.readFileSync(htmlFile, 'utf-8')
    const css = fs.readFileSync(__dirname + '/' + filename + '/index.css', 'utf-8')
    const js = fs.readFileSync(__dirname + '/' + filename + '/index.js', 'utf-8')
    const output = html + `<style ${tagAttr}>${css}</style>` + `<script ${tagAttr}>${js}</script>`
    fs.writeFileSync(htmlFile, output, 'utf-8')

    showReloadMessage(enableMessage)
  })

  const disable = vscode.commands.registerCommand(disableCommand, function () {
    const html = fs.readFileSync(htmlFile, 'utf-8')
    const regex = new RegExp(
      `<style[^>]*${tagAttr}[^>]*>.*?</style>|<script[^>]*${tagAttr}[^>]*>.*?</script>`,
      'gs',
    )
    const output = html.replace(regex, '')
    fs.writeFileSync(htmlFile, output, 'utf-8')

    showReloadMessage(disableMessage)
  })

  context.subscriptions.push(disposable)
  context.subscriptions.push(disable)
}

function activate(context) {
  this.extensionName = 'shaobeichen.gradient-theme'
  this.cntx = context

  registerCommand(context, 'GradientBeardedThemeArc', 'gradient-bearded-theme-arc')
}

exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
