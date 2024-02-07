# 基础

## eslint

- 首先在项目里安装 eslint，不需要在全局安装 `npm install eslint --save-dev`
- 安装好后 `eslint --init`，生成个新的 eslintrc 文件
- 如果想让 vscode 在写代码的过程中报错（就是红色波浪线）的话，就需要在 vscode 的插件市场安装 eslint，你也可以放到项目的某一个目录下，他就会只是检测同级目录下的文件
- 可以再报错的地方看到它是什么报错，然后再配置文件中添加相应的规则，有三种状态，分别是 `error`、`warn`、`off`

## prettier

- 首先安装 `npm i --save-dev prettier`
- 然后在 vscode 插件市场中添加 `Prettier - Code formatter` 这个插件
- 然后在项目根目录下新建一个 `.prettierrc` 的文件
- 一行太长的话可以用：`printWidth`，一行超过多少的话就会自动换行

## 解决冲突

- 问题：用 prettier 格式化后，eslint 报错
- 解决
  - 在项目中安装两个插件： `npm install eslint-plugin-prettier eslint-config-prettier --save-dev`
  - 在 `extends` 的数组中添加 `"plugin:prettier//recommended"`，即可解决两个之间的冲突

## git 的钩子

- 它是用来确保提交代码的时候，通过了 eslint 的检测，是个 git 的 hook
- 安装步骤
  - 首先安装 `npm install --save-dev pre-commit`
  - 然后再 `package` 中添加一段脚本
    - 在 `scripts` 中添加 ` "lint": "eslint eslint_text.js"`
    - 然后在最外层添加 `"pre-commit": ["lint"]` 执行此脚本即可

## 其他

- 可以通过`npm init -y` 快速初始化 `package.json`
