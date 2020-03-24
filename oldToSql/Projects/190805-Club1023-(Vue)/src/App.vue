<template>
  <div id='main'>
    <router-view :DBfromApp='this.DB'></router-view>
  </div>
</template>

<script>
  import DB from './api/DB.js'
  export default {
    data:function(){
      return {
        DB:DB,//注册暴露的数据库
      }
    },
    methods:{
    },
    created(){
      //默认页面开启时候不保存登录数据
      localStorage.club1023User="";
    },
  }
</script>

<style scoped>
  @import './assets/css/App/app.css';
</style>

