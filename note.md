nvm use 18

vsce login shaobeichen

vsce package --out ./1.2.2.vsix --no-yarn

vsce publish

vsce publish --no-dependencies
