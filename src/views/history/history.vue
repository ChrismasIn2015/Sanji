<template>
  <div class="history-line flex-y">
    <!-- 导航 -->
    <div class="line-nav flex-x-reverse">
      <div class="common-btn" @click.stop="toIndex">返回</div>
      <div class="common-btn blue-on" @click.stop="renderChina">新中国史</div>
      <div class="common-btn blue-on" @click.stop="renderWorld">世界史</div>
    </div>
    <!-- 内容 -->
    <div class="line-content">
      <div class="flex" v-for="(list, time) in timeMap" :key="time">
        <div class="line-item">{{ list[0] }}</div>
        <div class="line-item" v-for="(title, index) in list[1]" :key="index" v-html="title" />
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="line-now flex">
      <div
        class="common-btn blue-on"
        v-for="value in 12"
        :key="value"
        :class="{ blue: value >= 6 }"
      >{{ value }}</div>
    </div>
  </div>
</template>

<script>
import worldTime from "./data/wordLine.js";
import chinaTime from "./data/chinaLine.js";
export default {
  data() {
    return {
      timeMap: new Map()
    };
  },
  mounted() {
    this.renderWorld();
  },
  methods: {
    renderWorld() {
      this.timeMap = worldTime;
      // Object.assign({}, { temp: null });
    },
    renderChina() {
      this.timeMap = chinaTime;
      // Object.assign({}, { temp: null });
    },
    toIndex() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './styles/history.scss';
</style>
