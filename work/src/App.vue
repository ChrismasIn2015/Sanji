<template>
  <!-- 
    处处有码：
      设计稿: 宽度/字体 1920px/18px
    处处有码：
      页面1：Login 登录
      页面2. Index TarBar管理模式
        - TarBar 不变 功能组件通过 TarBar 切换
  -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./common-ui/common-ui.scss";
@import "./components/qrCode-table.scss";
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
  background-color: $common-back;
}
</style>
