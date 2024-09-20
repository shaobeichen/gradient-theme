const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const version = process.argv[2]
const token = process.argv[3]
const packageJsonPath = path.join(__dirname, '../package.json')

// 读取 package.json
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  // 更新版本号
  packageJson.version = version

  // 写入更新后的 package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log(`Updated version to ${version} in package.json`)

  // 提交更改到 Git
  execSync('git add package.json')
  execSync(`git commit -m "Update version to ${version}"`)
  execSync(`git remote set-url origin https://${token}@github.com/shaobeichen/gradient-theme.git`)
  execSync('git push')
  console.log('Changes committed and pushed to remote.')
}
