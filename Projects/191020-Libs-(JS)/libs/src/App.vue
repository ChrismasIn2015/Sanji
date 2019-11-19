<template>
  <div id="app" @click.prevent.right> <router-view></router-view> </div>
</template>

<script>

export default {

}
</script>

<style>
html, body{
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  width: 100%;
  height: 100%;
}
/* 公共CSS */
/* 右键菜单按钮 */
.right-btn{
  padding: 5px;
  width: 100px;
  line-height: 24px;
  text-align: center;
  background-color: black;
  color: white;
  box-sizing: border-box;
  border: 1px white solid;
}
/* 裁剪 */
.text-cut{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
