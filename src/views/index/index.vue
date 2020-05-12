<template>
  <div class="index">
    <div class="index-entry flex">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue" @click.stop="toHistory">
        时间
      </div>
      <div class="entry common-btn orange" @click.stop="toUI">
        UI
      </div>
      <div class="entry common-btn pink" @click.stop="toColor">
        Color
      </div>
    </div>

    <!-- 每日标记 -->
    <planBoard />
  </div>
</template>

<script>
  import planBoard from './components/planBoard.vue'
  export default {
    data() {
      return {}
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
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/index.scss';
</style>
