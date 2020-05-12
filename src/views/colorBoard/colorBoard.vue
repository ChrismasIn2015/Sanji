<template>
  <div class="color-board flex-y">
    <!-- 导航条 -->
    <div class="board-nav flex-x-reverse">
      <div class="common-btn toggle" @click.stop="toIndex">返回</div>
    </div>
    <!-- 内容 -->
    <div class="board-content flex">
      <div class="">
        <h3>X</h3>
        <h3>255</h3>
        <div
          class="color-block"
          v-for="(color, index) in xList"
          :key="index"
          :style="color"
          @click.stop="getColor(color['background-color'])"
        ></div>
      </div>
      <div class="">
        <h3>Y</h3>
        <h3>255</h3>
        <div
          class="color-block"
          v-for="(color, _index) in yList"
          :key="_index"
          :style="color"
          @click.stop="getColor(color['background-color'])"
        ></div>
      </div>
      <div class="">
        <h3>Z</h3>
        <h3>255</h3>
        <div
          class="color-block"
          v-for="(color, __index) in zList"
          :key="__index"
          :style="color"
          @click.stop="getColor(color['background-color'])"
        ></div>
      </div>
      <div class="">
        <h3>1.选择色调</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import { mouseCopy } from '@/utils/utils.js'
  export default {
    data() {
      return {
        xList: [],
        yList: [],
        zList: [],
      }
    },
    mounted() {
      this.setThreeList()
    },
    methods: {
      setThreeList() {
        let temp1 = []
        let temp2 = []
        let temp3 = []
        for (let i = 0; i < 16; i++) {
          temp1.push({ 'background-color': `rgb(${i * 16}, 0, 0)` })
          temp2.push({ 'background-color': `rgb(0, ${i * 16}, 0)` })
          temp3.push({ 'background-color': `rgb(0, 0, ${i * 16})` })
        }
        this.xList = temp1.reverse()
        this.yList = temp2.reverse()
        this.zList = Object.assign([], temp3.reverse())
      },
      toIndex() {
        this.$router.push({ name: 'index' })
      },
      getColor(color) {
        mouseCopy(color, (res) => this.$tip(`复制成功 ${res}`))
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/colorBoard.scss';
</style>
