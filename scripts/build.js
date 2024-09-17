const fs = require('fs')
const path = require('path')
const sass = require('sass')

const config = {
  themes: ['gradient-bearded-theme-arc', 'gradient-dracula-theme'],
  classTemplate: 'shaobeichen-gradient-theme-themes-${themeName}-json',
  tagAttr: 'data-gradient-theme-id',
}

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
  return prev + `<style ${config.tagAttr}>${scssCompile.css.toString()}</style>`
}, '')

fs.writeFileSync(indexFilePath, output, 'utf-8')
