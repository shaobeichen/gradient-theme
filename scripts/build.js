/**
 * Copyright (c) 2024 shaobeichen <shaobeichen@outlook.com>
 * All rights reserved.
 */

const fs = require('fs')
const path = require('path')
const sass = require('sass')
const packageJson = require('../package.json')

const config = {
  classTemplate: 'shaobeichen-gradient-theme-themes-${themeName}-json',
  tagAttr: 'data-gradient-theme-id',
  themes: [],
}

config.themes = packageJson.contributes.themes.map((item) =>
  item.path.replace('./themes/', '').replace('.json', '').replace(/\//g, '-'),
)

const folderPath = path.join(__dirname, '../dist')

if (fs.existsSync(folderPath)) {
  fs.rmSync(folderPath, { recursive: true, force: true })
}

const indexFilePath = path.join(folderPath, 'index.html')
fs.mkdirSync(folderPath, { recursive: true })

const output = config.themes.reduce((prev, cur) => {
  const cssFileUrl = path.join(__dirname, '../src/' + cur + '/index.css')
  const cssText = fs.readFileSync(cssFileUrl, 'utf-8')
  const scssText = `.${config.classTemplate.replace('${themeName}', cur)}{${cssText}}`
  const scssCompile = sass.compileString(scssText, { sourceMap: false, style: 'expanded' })
  const cssWithoutCharset = scssCompile.css.toString().replace(/^@charset "UTF-8";\s*/g, '')
  return (
    prev +
    `
<style ${config.tagAttr}>
${cssWithoutCharset}
</style>
`
  )
}, '')

fs.writeFileSync(indexFilePath, output, 'utf-8')
