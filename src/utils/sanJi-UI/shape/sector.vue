<template>
  <div class="shape" :style="shapeStyle">
    <div class="sector" :style="sectorStyle"></div>
  </div>
</template>

<script>
  import { mouseCopy } from '@/utils/utils.js'
  export default {
    props: {
      option: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    watch: {
      option: {
        handler(newValue, old) {
          this.watchOption(newValue, old)
        },
        immediate: true,
      },
    },
    data() {
      return {
        shapeStyle: {
          width: '0px',
          height: '0px',
        },
        sectorStyle: {},
      }
    },
    methods: {
      watchOption(newValue, old) {
        let shapeTemp = {
          width: '0px',
          height: '0px',
        }
        let sectorTemp = {}
        if (newValue) {
          shapeTemp = {
            width: `${newValue.radius}px`,
            height: `${newValue.radius}px`,
          }
          sectorTemp = {
            'background-color': newValue.color,
            clip: `rect(0px ${newValue.radius}px ${newValue.radius * 2}px 0px)`,
            transform: `rotate(${newValue.rotate}deg)`,
          }
        }
        this.shapeStyle = Object.assign({}, shapeTemp)
        this.sectorStyle = Object.assign({}, sectorTemp)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .shape {
    position: relative;
    overflow: hidden;
    .sector {
      position: absolute;
      left: -100%;
      width: 200%;
      height: 200%;
      border-radius: 50%;
    }
  }
</style>
