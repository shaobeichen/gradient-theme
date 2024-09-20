#!/bin/bash

VERSION=\$1
BRANCH=\$2
COMMITS=\$3
TIMESTAMP=\$4
TOKEN=\$GITHUB_TOKEN

# 运行更新版本脚本
node scripts/package.js $VERSION $TOKEN

# 运行构建脚本
node scripts/release.js

