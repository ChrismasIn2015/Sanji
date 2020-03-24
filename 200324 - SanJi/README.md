## 1.项目 sanji 搭建流程

- 1.通过 @vue/cli 构建 web 开发环境

  - vue create app-name
  - 1.1 核心 vue / vue-router / vuex
  - 1.2 样式 css-scss
  - 1.3 网络请求 axios

- 2.通过 vue-cli-plugin-electron-builder 添加 electron 开发环境

  - 构建 vue add electron-builder
  - 相关命令 package.json

- 3.通过 sql.js 添加数据库环境（npm install sql.js）

## 2.关键项目结构

- dist :web 打包目标
- dist_electron :electron 打包目标
- src
  - background.js (Electron main)
