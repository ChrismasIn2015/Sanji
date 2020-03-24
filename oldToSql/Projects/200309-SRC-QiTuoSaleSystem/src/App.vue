<template>
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
  cursor: default;
}
</style>
