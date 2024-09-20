# Gradient Theme

![Gradient Theme logo](./images/banner.png)

[![](https://badgen.net/vs-marketplace/v/shaobeichen.gradient-theme)](https://marketplace.visualstudio.com/items?itemName=shaobeichen.gradient-theme)
[![](https://badgen.net/vs-marketplace/i/shaobeichen.gradient-theme)](https://marketplace.visualstudio.com/items?itemName=shaobeichen.gradient-theme)
[![](https://badgen.net/vs-marketplace/d/shaobeichen.gradient-theme)](https://marketplace.visualstudio.com/items?itemName=shaobeichen.gradient-theme)

English | [中文文档](./README-zh.md)

[Current repository link](https://github.com/shaobeichen/gradient-theme). If you like it, please give it a star!

# Warning

![corrupt](./images/corrupt.png)

Although the warning will not affect any functionality, If you are very concerned about the VSCode "corrupted" warning prompt, **it is not recommended** to use this theme.

If you do not want to ignore the "corrupted" warning prompt, please consider carefully whether to use this theme.

To be honest, I was very mind at first, but after I ignored the "corrupted" warning prompt, I no longer cared.

# Inspiration

One day, I saw a video where someone modified the VSCode theme's CSS file themselves.

So I thought I could use the same method to create a VSCode gradient effect CSS file,

Then I started using Custom CSS and JS Loader plugin to load the custom gradient CSS,

Later, many people thought my gradient theme was very beautiful and wanted to use it on their own VSCode,

But to use it, they needed to install a plugin and I had to give them a CSS file, which was too troublesome!

So I learned how to make a VSCode theme plugin and made this gradient theme plugin.

# Themes

### Gradient Bearded Theme Arc

![Gradient Theme text](./images/gradient-bearded-theme-arc.png)

I added a gradient effect to the Arc theme in [Bearded Theme](https://marketplace.visualstudio.com/items?itemName=BeardedBear.beardedtheme).

### Gradient Dracula Theme

![Gradient Theme text](./images/gradient-dracula-theme.png)

I added a gradient effect to [Dracula Theme](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula).

# Installation

- Install the theme from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=shaobeichen.gradient-theme).

  Or

- Search for Gradient Theme or gradient-theme in VSCode and install it.

After installation, you can choose the base theme, **there is no gradient effect at this time**, if you want to enable the gradient effect, please see the next step.

**Why isn't the gradient effect enabled directly?**

Because enabling the gradient effect will modify the core files of VSCode, which will be interpreted as "corrupted" by VSCode, and you may see a warning prompt when restarting the editor, but you can safely ignore this message.

If you don't want to ignore the warning prompt, please consider carefully whether to use this theme.

# Gradient Effects

### Enable Gradient

![enable command](./images/command.png)

You can enable it by pressing `Ctrl + Shift + P` or `Shift + ⌘ + P` and selecting "**Gradient Theme: Enable Gradient**".

### Disable Gradient

You can disable it by pressing `Ctrl + Shift + P` or `Shift + ⌘ + P` and selecting "**Gradient Theme: Disable Gradient**".

### Restart Editor

![restart](./images/restart.png)

After enabling or disabling the gradient effect, there will be a prompt, click to restart the editor to see the gradient effect.

# Please Note

### 1. Ignore the "Corrupted" Warning Prompt

![corrupt](./images/corrupt.png)

Please note that since enabling the gradient effect modifies the core files of VSCode, VSCode will interpret it as a "corrupted" core file, and you may see a warning prompt when restarting the editor, which you can safely ignore.

If you do not want to ignore the warning prompt, please consider carefully whether to use this theme.

### 2. Execute Enable command, prompt no permission

![permission](./images/permission.png)

If you are a Windows user, you may need to run VS Code with administrator privileges. For Linux and Mac users, Code must not be installed in a read-only location and you must have write permissions.

### 3. Update VSCode

Please note that after each update of VSCode, you need to repeat the steps to re-enable the gradient effect.

### 4. Switch to Other Themes

Please note that if you have enabled the gradient effect and want to switch to another theme, you can first disable the gradient effect and then choose another theme, otherwise the gradient theme will affect the colors of other themes.

# Compatibility

This theme is still being updated and optimized. I mainly use HTML, CSS, JS, TS, Vue, React, etc. for development, so although these languages and frameworks look good, other languages and frameworks may not be suitable for the theme. If you find any obvious problems, you can raise an issue, and I will resolve it as soon as possible.

# How to Contribute

I'm glad you're interested in this theme, and any suitable contribution is welcome.

1. Fork and Clone this repository `git clone https://github.com/<YOUR-USERNAME>/gradient-theme`
2. Create a branch for your changes `git checkout -b my-new-feature`
3. Open the _gradient-theme_ folder in VSCode
4. Modify the files you want to change
5. Use F5 in VSCode to preview the debug
6. Commit and Push your changes
7. Submit a PR, please note that not all suggestions can be accepted

# Thanks

Thanks to Lun Dev for inspiring me to create this gradient theme. 🙏

**[Lun Dev](https://www.youtube.com/@lundeveloper)**

Thanks to the authors of the following themes for their contributions to open source. 🙏 I made gradient effects for each theme based on the following themes.

**[Bearded Theme](https://marketplace.visualstudio.com/items?itemName=BeardedBear.beardedtheme)**

**[Dracula Theme Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)**

## Star History

[![Stargazers over time](https://starchart.cc/shaobeichen/gradient-theme.svg?variant=adaptive)](https://starchart.cc/shaobeichen/gradient-theme)
