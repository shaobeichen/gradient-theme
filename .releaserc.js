/**
 * Copyright (c) 2024 shaobeichen <shaobeichen@outlook.com>
 * All rights reserved.
 */

module.exports = {
  branches: ['main'], // 指定在哪个分支下要执行发布操作
  plugins: [
    '@semantic-release/commit-analyzer', // 用于分析提交的类型，feat和fix类型都会发版和升级版本号
    '@semantic-release/release-notes-generator', // 生成 CHANGELOG.md 文件
    [
      '@semantic-release/changelog', // 将 commit 记录到项目的 changelog 文件中
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm', // 用来更新 package.json 的，如果不需要发到 npm 可以设 npmPublish 为 false
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/github', // 发布 GitHub Release 并对已发布的拉取请求/问题发表评论。
    [
      '@semantic-release/git', // 把发版过程中修改的文件提交到 Git 仓库
      {
        assets: ['CHANGELOG.md', 'package.json'],
      },
    ],
    'semantic-release-vsce', // 发布到 VSCode Marketplace
  ],
}
