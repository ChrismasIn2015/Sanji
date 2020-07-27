<template>
  <div class="index-entry flex-y">
    <div class="common-btn red" @click.stop="openMyDevTool">打开控制台</div>
    <div v-show="nowRoutePathName !== 'library'" class="common-btn" @click.stop="toLibrary">笔记系统</div>
    <div v-show="nowRoutePathName !== 'uiBoard'" class="common-btn orange" @click.stop="toUI">sjUI</div>
    <div v-show="nowRoutePathName !== 'colorBoard'" class="common-btn pink" @click.stop="toColor">Color</div>
    <div v-show="nowRoutePathName !== 'history'" class="common-btn blue" @click.stop="toHistory">日历</div>
    <div v-show="nowRoutePathName !== 'stockBoard'" class="common-btn deep-green" @click.stop="toStock">StockStore</div>
    <div v-show="nowRoutePathName !== 'index'" class="common-btn toggle" @click.stop="toIndex">首页</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nowRoutePathName: '',
      }
    },
    mounted() {
      this.nowRoutePathName = this.$route.name
    },
    methods: {
      toIndex() {
        this.$router.push({ name: 'index' })
      },
      toStock() {
        this.$router.push({ name: 'stockBoard' })
      },
      toUI() {
        this.$router.push({ name: 'uiBoard' })
      },
      toLibrary() {
        this.$router.push({ name: 'library' })
      },
      toHistory() {
        this.$router.push({ name: 'history' })
      },
      toColor() {
        this.$router.push({ name: 'colorBoard' })
      },
      openMyDevTool() {
        this.$invoker.openDevTool()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .index-entry {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    .common-btn {
      margin-bottom: 0.5rem;
    }
  }
</style>
