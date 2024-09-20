const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

function exe(cmd, callback) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    if (callback) callback()
    console.log(`stdout: ${stdout}`)
  })
}

const ci = process.argv[2]
const vsceToken = process.argv[2]

exe('node scripts/build.js', () => {
  const folderPath = path.join(__dirname, '../dist')
  const indexFilePath = path.join(folderPath, 'index.html')
  const cssText = fs.readFileSync(indexFilePath, 'utf-8')
  if (!cssText) {
    console.error('dist html file is empty!')
    return
  }

  if (ci) {
    exe(`npx vsce login --token ${vsceToken}`, () => {
      exe('npx vsce publish --no-dependencies')
    })
    return
  }

  exe('npx vsce publish --no-dependencies')
})