<template>
  <div class="index-entry flex-y">
    <div class="common-btn toggle">{{ nowTimeString }}</div>
    <div v-show="nowRoutePathName !== 'index'" class="common-btn red" @click.stop="toIndex">首页</div>
    <div class="common-btn red" @click.stop="openMyDevTool">打开控制台</div>
    <div
      v-show="nowRoutePathName !== 'library'"
      class="common-btn orange"
      @click.stop="toLibrary"
    >笔记系统</div>
    <div v-show="nowRoutePathName !== 'uiBoard'" class="common-btn blue" @click.stop="toUI">sjUI</div>
    <div v-show="nowRoutePathName !== 'colorBoard'" class="common-btn" @click.stop="toColor">Color</div>
    <div v-show="nowRoutePathName !== 'history'" class="common-btn pink" @click.stop="toHistory">日历</div>
    <div
      v-show="nowRoutePathName !== 'stockBoard'"
      class="common-btn deep-green"
      @click.stop="toStock"
    >股票</div>
  </div>
</template>

<script>
import { getMM, getDD } from "@/utils/utils.js";
export default {
  data() {
    return {
      nowRoutePathName: "",
      nowTimeString: "",
      nowTimer: null,
    };
  },
  mounted() {
    //
    this.nowRoutePathName = this.$route.name;
    //
    this.setNowTimeBoard();
  },
  methods: {
    toIndex() {
      this.$router.push({ name: "index" });
    },
    toStock() {
      this.$router.push({ name: "stockBoard" });
    },
    toUI() {
      this.$router.push({ name: "uiBoard" });
    },
    toLibrary() {
      this.$router.push({ name: "library" });
    },
    toHistory() {
      this.$router.push({ name: "history" });
    },
    toColor() {
      this.$router.push({ name: "colorBoard" });
    },
    openMyDevTool() {
      this.$invoker.openDevTool();
    },
    setNowTimeBoard() {
      if (this.nowTimer) clearInterval(this.nowTimer);
      this.nowTimer = setInterval(() => {
        let now = new Date();
        let nowMill = now.getTime();
        let hour = now.getHours();
        let min = now.getMinutes();
        let sec = now.getSeconds();
        this.nowTimeString = `${getMM(nowMill)}-${getDD(nowMill)} ${
          hour < 10 ? "0" + hour : hour
        }:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
      }, 1000);
    },
  },
};
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
