<template>
  <div class="index">
    <div class="index-entry flex">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue" @click.stop="toHistory">日历</div>
      <div class="entry common-btn orange" @click.stop="toUI">sjUI</div>
      <div class="entry common-btn pink" @click.stop="toColor">Color</div>
      <div
        class="entry common-btn toggle"
        style="margin-left: auto;"
        @click.stop="openMyDevTool"
      >
        打开控制台
      </div>
    </div>

    <!-- 每日标记 -->
    <planBoard :schedule="myScheduleA" />
    <planBoard :schedule="myScheduleB" />
  </div>
</template>

<script>
  import planBoard from './components/planBoard.vue'
  export default {
    data() {
      return {
        myScheduleA: [
          {
            time: null,
            tip: 'Start: 0515',
            affair: [
              { name: 'sjUI', done: 0 },
              { name: 'erpUI', done: 0 },
              { name: 'WebServer C++', done: 0 },
            ],
            style: { 'background-color': 'rgb(255, 125, 212)' },
          },
          {
            time: null,
            affair: [
              { name: '计算机组成原理', done: 0 },
              { name: '内存 & C++', done: 0 },
              { name: 'WebServe & C++', done: 0 },
              { name: '32bit ≈ 43Y', done: 0 },
              { name: '64bit ≈ 1844YY', done: 0 },
            ],
            style: { 'background-color': 'rgb(235, 255, 125)' },
          },
        ],
        myScheduleB: [
          {
            time: ['07:00', '09:00'],
            affair: [
              { name: 'Politics', done: 0 },
              { name: 'Calculus', done: 0 },
            ],
            style: { 'background-color': 'rgb(255, 125, 212)' },
          },
          {
            time: ['10:00', '12:00'],
            affair: [
              { name: 'Politics', done: 0 },
              { name: 'Calculus', done: 0 },
            ],
            style: { 'background-color': 'rgb(235, 255, 125)' },
          },
          {
            time: ['14:00', '17:00'],
            affair: [{ name: 'Computer Science', done: 0 }],
            style: { 'background-color': 'rgb(125, 229, 255)' },
          },
          {
            time: ['21:00', '00:00'],
            affair: [
              { name: 'Comprehension', done: 0 },
              { name: 'Writing', done: 0 },
            ],
            style: { 'background-color': 'rgb(125, 255, 194)' },
          },
          {
            time: ['09:00', '20:00'],
            affair: [
              { name: 'x点击+登录判断', done: 1 },
              { name: 'x点击+小程序', done: 1 },
              { name: 'x功能链接+消息中心小红点', done: 1 },
              { name: 'x功能链接+扫描二维码', done: 1 },
              { name: 'x图文导航+圆角', done: 0 },
              { name: 'x图文导航+背景图', done: 0 },
              { name: 'x图片广告+是否轮播', done: 0 },
              { name: '中台UI=1920', done: 1 },
              { name: 'Tab资讯+样式更改', done: 1 },
            ],
            style: { 'background-color': 'rgb(125, 255, 194)' },
          },
        ],
      }
    },
    components: {
      planBoard,
    },
    methods: {
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
        let ipc = require('electron').ipcRenderer
        ipc.send('openDevTool')
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/index.scss';
</style>
