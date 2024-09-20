#!/bin/bash

VERSION=$1
BRANCH=$2
COMMITS=$3
TIMESTAMP=$4
TOKEN=$GITHUB_TOKEN

echo "VERSION: $VERSION"
echo "BRANCH: $BRANCH"

node scripts/package.js $VERSION $TOKEN

node scripts/release.js
 