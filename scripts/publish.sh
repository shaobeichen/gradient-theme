#!/bin/bash

VERSION=\$1
BRANCH=\$2
COMMITS=\$3
TIMESTAMP=\$4

# 运行更新版本脚本
node scripts/package.js $VERSION

# 运行构建脚本
node scripts/release.js

echo "Successfully published version $VERSION"
