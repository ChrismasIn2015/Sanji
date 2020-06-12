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
            time: ['09:00', '20:00'],
            affair: [
              { name: '【1.1】中台', done: 0 },
              { name: '配置值·登录判断', done: 0 },
              { name: '配置值·小程序跳转', done: 1 },
              { name: '配置值·功能链接：消息中心/二维码扫描', done: 0 },
              { name: '配置值·图文导航：圆角/背景图', done: 0 },
              { name: '配置值·图片广告：不轮播/自动轮播等...', done: 0 },
              {
                name: '【建议】图文导航：卡片样式可以使用圆角+背景图完成',
                done: 0,
              },
            ],
            style: { 'background-color': 'rgb(125, 255, 194)' },
          },
          {
            time: ['09:00', '20:00'],
            affair: [
              { name: '【1.1】C端', done: 0 },
              { name: '功能·点击登录判断', done: 1 },
              { name: '功能·点击跳转小程序', done: 1 },
              { name: '功能·功能链接：消息中心逻辑', done: 1 },
              { name: '功能·功能链接：相机扫描', done: 1 },
              { name: '样式·图文导航支持圆角', done: 1 },
              { name: '样式·图文导航支持背景图', done: 1 },
              { name: '样式·图片广告支持不轮播/自动轮播等...', done: 1 },
              { name: '样式·Tab资讯根据设计建议修改', done: 1 },
            ],
            style: { 'background-color': 'rgb(255,0,112)' },
          },
          {
            time: ['09:00', '20:00'],
            affair: [
              { name: '【1.2】中台', done: 0 },
              { name: '配置值·新组件：领取优惠券', done: 0 },
              { name: '配置值·新组件：Tab推荐位', done: 0 },
              { name: '配置值·新组件：推荐切换', done: 0 },
              { name: '配置值·组件标题:更多链接', done: 0 },
              { name: '配置值·图片广告:新增的样式', done: 0 },
            ],
            style: { 'background-color': 'rgb(125, 255, 194)' },
          },
          {
            time: ['09:00', '20:00'],
            affair: [
              { name: '【1.2】C端', done: 0 },
              { name: '新组件：领取优惠券', done: 0 },
              { name: '新组件：1 Tab推荐位 2 推荐切换', done: 0 },
              { name: 'BUG·合并Tab资讯,Tab列表,Tab推荐位,推荐切换', done: 0 },
              { name: '功能·组件标题:更多链接', done: 0 },
              { name: '样式·图片广告:新增的样式', done: 0 },
              { name: 'BUG·中台切换图片广告样式不生效', done: 0 },
            ],
            style: { 'background-color': 'rgb(255,0,112)' },
          },
        ],
        myScheduleB: [
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
          {
            time: ['07:00', '09:00'],
            affair: [
              { name: '■ ■', done: 0 },
              { name: 'Politics', done: 0 },
              { name: 'Calculus', done: 0 },
            ],
            style: { 'background-color': 'rgb(255, 125, 212)' },
          },
          {
            time: ['10:00', '12:00'],
            affair: [
              { name: '■ ■ ■', done: 0 },
              { name: 'Politics', done: 0 },
              { name: 'Calculus', done: 0 },
            ],
            style: { 'background-color': 'rgb(235, 255, 125)' },
          },
          {
            time: ['14:00', '18:00'],
            affair: [
              { name: '■ ■ ■ ■', done: 0 },
              { name: 'Computer Science', done: 0 },
            ],
            style: { 'background-color': 'rgb(125, 229, 255)' },
          },
          {
            time: ['21:00', '00:00'],
            affair: [
              { name: '■ ■ ■', done: 0 },
              { name: 'Comprehension', done: 0 },
              { name: 'Writing', done: 0 },
              { name: 'sjUI / erpUI', done: 0 },
              { name: '', done: 0 },
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
