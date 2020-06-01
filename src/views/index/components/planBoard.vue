<template>
  <div class="plan-board">
    <!-- 每日标记 -->
    <div class="">
      <div class="block-list flex-wrap">
        <div
          class="block"
          v-for="(item, index) in schedule"
          :key="index"
          :style="item.style"
          :class="{ 'block-on': chargeRange(item.time) }"
        >
          <div v-for="_item in item.time" :key="_item">
            {{ _item }}
          </div>
          <div v-show="item.time" class="block-margin"></div>
          <div v-for="(__item, __index) in item.affair" :key="__index">
            {{ __item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { chargeHHMMRange } from '@/utils/utils.js'
  export default {
    props: {
      schedule: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data() {
      return {}
    },
    methods: {
      chargeRange(list) {
        return chargeHHMMRange(list)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .plan-board {
    margin: 2rem 0rem;
    // Time Block
    .block-list {
      align-items: flex-start;
      .block {
        width: 10rem;
        margin-right: 0.5rem;
        padding: 0.5rem;
        cursor: pointer;
        opacity: 0.3;
        transition: all 0.2s;
        &:hover {
          opacity: 1;
        }
        .block-margin {
          margin: 1rem 0rem;
        }
      }
      .block-on {
        opacity: 1;
      }
    }
  }
</style>
