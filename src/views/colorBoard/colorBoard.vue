<template>
  <div class="color-board flex-y">
    <!-- 导航条 -->
    <div class="board-nav flex-x-reverse">
      <div class="common-btn toggle" @click.stop="toIndex">返回</div>
      <div class="common-btn toggle" @click.stop="clearColor">清空</div>
    </div>
    <!-- 内容 -->
    <div class="board-content">
      <!-- ----------------------------------------功能区---------------------------------------- -->
      <div>
        <h2>色彩三要素 色调（色相）饱和度（纯度）明度</h2>
        <div class="flex color-show">
          <div
            class="color-block"
            v-for="(color, index) in mainColor"
            :key="index"
            :style="{ 'background-color': color }"
          ></div>
        </div>
      </div>
      <!-- ----------------------------------------展示区---------------------------------------- -->
      <!-- 1 -->
      <div style="text-align: right;">
        <h2>RGB ( 255 > 0↑ > 0 ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countY in 17"
          :key="'0' + countY"
          :style="{ 'background-color': `rgb(255,${(countY - 1) * 16},0)` }"
          @click.stop="getColor(`rgb(255,${(countY - 1) * 16},0)`)"
        ></div>
      </div>
      <!-- 2 -->
      <div style="text-align: right;">
        <h2>RGB ( 255↓ > 255 > 0 ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countX in 17"
          :key="'1' + countX"
          :style="{ 'background-color': `rgb(${(17 - countX) * 16},255,0)` }"
          @click.stop="getColor(`rgb(${(17 - countX) * 16},255,0)`)"
        ></div>
      </div>
      <!-- 3 -->
      <div style="text-align: right;">
        <h2>RGB ( 0 > 255 > 0↑ ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countX in 17"
          :key="'1' + countX"
          :style="{ 'background-color': `rgb(0,255,${(countX - 1) * 16})` }"
          @click.stop="getColor(`rgb(0,255,${(countX - 1) * 16})`)"
        ></div>
      </div>
      <!-- 4 -->
      <div style="text-align: right;">
        <h2>RGB ( 0 > 255↓ > 255 ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countX in 17"
          :key="'1' + countX"
          :style="{ 'background-color': `rgb(0,${(17 - countX) * 16},255)` }"
          @click.stop="getColor(`rgb(0,${(17 - countX) * 16},255)`)"
        ></div>
      </div>
      <!-- 5 -->
      <div style="text-align: right;">
        <h2>RGB ( 0↑ > 0 > 255 ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countX in 17"
          :key="'1' + countX"
          :style="{ 'background-color': `rgb(${(countX - 1) * 16},0,255)` }"
          @click.stop="getColor(`rgb(${(countX - 1) * 16},0,255)`)"
        ></div>
      </div>
      <!-- 6 -->
      <div style="text-align: right;">
        <h2>RGB ( 255 > 0 > 255↓ ) 双色调</h2>
      </div>
      <div class="flex">
        <div
          class="color-block"
          v-for="countZ in 17"
          :key="'1' + countZ"
          :style="{ 'background-color': `rgb(255,0,${(17 - countZ) * 16})` }"
          @click.stop="getColor(`rgb(255,0,${(17 - countZ) * 16})`)"
        ></div>
      </div>
      <!-- * -->
      <div style="text-align: right;">
        <h2>RGB 光学三原色 单色调</h2>
      </div>
      <div class="flex">
        <ring :option="{ radius: 100, deg: 30, type: 'x' }" />
        <ring :option="{ radius: 100, deg: 30, type: 'y' }" />
        <ring :option="{ radius: 100, deg: 30, type: 'z' }" />
      </div>
    </div>
  </div>
</template>

<script>
  import ring from '@/utils/sanJi-UI/shape/ring.vue'
  import { mouseCopy } from '@/utils/utils.js'
  export default {
    data() {
      return {
        mainColor: [],
      }
    },
    mounted() {},
    components: {
      ring,
    },
    methods: {
      clearColor() {
        this.mainColor = []
      },
      toIndex() {
        this.$router.push({ name: 'index' })
      },
      getColor(color) {
        this.mainColor.push(color)
        mouseCopy(color, (res) => this.$tip(`复制成功 ${res}`))
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/colorBoard.scss';
</style>
