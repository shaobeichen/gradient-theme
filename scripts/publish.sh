#!/bin/bash

VERSION=$1
BRANCH=$2
COMMITS=$3
TIMESTAMP=$4

echo "VERSION: $VERSION"
echo "BRANCH: $BRANCH"

node scripts/package.js $VERSION $GITHUB_TOKEN

node scripts/release.js $CI $VSCE_TOKEN
 