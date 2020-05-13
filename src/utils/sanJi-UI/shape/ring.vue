<template>
  <!-- 这是一个色轮组件 -->
  <div class="ring" :style="ringStyle">
    <div
      class="my-sector-board"
      v-for="(option, index) in sectorList"
      :key="index"
      :style="{ transform: `rotate(${index * option.rotate}deg)` }"
    >
      <div class="my-sector">
        <sector :option="option" />
      </div>
    </div>
  </div>
</template>

<script>
  import sector from '@/utils/sanJi-UI/shape/sector.vue'
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
        ringStyle: {
          width: '0px',
          height: '0px',
        },
        sectorList: [],
      }
    },
    components: {
      sector,
    },
    methods: {
      watchOption(newValue, old) {
        let ringTemp = {
          width: '0px',
          height: '0px',
        }
        let sectorTemp = []
        if (newValue) {
          ringTemp = {
            width: `${newValue.radius * 2}px`,
            height: `${newValue.radius * 2}px`,
          }
          let allCount = parseInt(360 / newValue.deg)
          for (let i = 0; i < allCount; i++) {
            let option = {
              color: this.getTypeColor(newValue.type, i, allCount), // -1 ring 0 x 1 y 2 z
              radius: newValue.radius,
              rotate: newValue.deg,
            }
            sectorTemp.push(option)
          }
        }
        this.ringStyle = Object.assign({}, ringTemp)
        this.sectorList = Object.assign({}, sectorTemp)
      },
      getTypeColor(type, index, allCount) {
        let molecule = allCount - index
        let denominator = parseInt(allCount)
        let color = `rgb(0,0,0)`
        if (type === 'x') color = `rgb(${(molecule / denominator) * 255},0,0)`
        if (type === 'y') color = `rgb(0,${(molecule / denominator) * 255},0)`
        if (type === 'z') color = `rgb(0,0,${(molecule / denominator) * 255})`
        return color
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ring {
    position: relative;
    .my-sector-board {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      .my-sector {
        position: absolute;
        top: 0%;
        left: 50%;
      }
    }
  }
</style>
