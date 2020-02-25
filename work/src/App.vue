<template>
  <!-- 
    处处有码：设计稿宽度 1920px
    处处有码：业务流程
    1.Login 登录
    2.Index 处处有码功能集合
      -  功能组件 /views/:component
  -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./common-ui/common-ui.scss";
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
