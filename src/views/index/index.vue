<template>
  <div class="index">
    <div class="index-entry flex">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue" @click.stop="toHistory">
        历史大事件
      </div>
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
            affair: ['sjUI', 'erpUI', 'WebServer C++'],
            style: { 'background-color': 'rgb(255, 125, 212)' },
          },
          {
            time: null,
            affair: [
              '计算机组成原理',
              '操作系统',
              '内存 & C++',
              'WebServe & C++',
            ],
            style: { 'background-color': 'rgb(235, 255, 125)' },
          },
        ],
        myScheduleB: [
          {
            time: ['07:00', '09:00'],
            affair: ['Politics', 'Calculus'],
            style: { 'background-color': 'rgb(255, 125, 212)' },
          },
          {
            time: ['10:00', '12:00'],
            affair: ['Politics', 'Calculus'],
            style: { 'background-color': 'rgb(235, 255, 125)' },
          },
          {
            time: ['14:00', '17:00'],
            affair: ['Computer Science'],
            style: { 'background-color': 'rgb(125, 229, 255)' },
          },
          {
            time: ['21:00', '00:00'],
            affair: ['Comprehension', 'Writing'],
            style: { 'background-color': 'rgb(125, 255, 194)' },
          },
          {
            time: ['09:00', '20:00'],
            affair: [
              'A1.（√√）中台UI=1920',
              'B1.（xx）点击+登录判断',
              'B2.（xx）点击+小程序',
              'B31.（x√）功能链接+小红点消息中心',
              'B32.（xx）功能链接+扫描二维码',
              'B41.（xx）图文导航+圆角',
              'B42.（xx）图文导航+背景图',
              'B5.（xx）图片广告+是否轮播',
              'B6.（x√）Tab资讯+样式更改',
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
