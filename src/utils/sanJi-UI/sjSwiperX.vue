<template>
  <div>
    <div class="img-frame">
      <!-- **************************** 横向轮播图 **************************** -->
      <div
        class="img-strip flex"
        :style="{
          transition: `left ${stripAllowMove ? '0s' : '0.1s'}`,
          left: `${stripDisValue}px`,
          width: `${stripWidth}px`,
        }"
      >
        <div
          class="img-item"
          v-for="(item, index) in config.images"
          :key="index"
          :style="{
            width: `${config.imageRate * frameWidth}px`,
            'margin-right': `${
              index !== config.images.length - 1 ? config.gap : 0
            }px`,
            'border-radius': `${item['radius'] ? 0.4 : 0}rem`,
            'font-size': `${item.fontSize / htmlFontSize}rem`,
            transform: `scale(${
              indexNumber !== index && item['3d'] ? 0.9 : 1
            })`,
          }"
          @mousedown.prevent="setStripSwitch_x(1)"
          @mousemove.prevent="setStripLocation_x"
          @mouseleave.prevent="setStripSwitch_x(0)"
          @mouseup.prevent="setStripSwitch_x(0, item)"
          @touchstart.prevent="setStripSwitch_x(1)"
          @touchmove.prevent="setStripLocation_x"
          @touchcancel.prevent="setStripSwitch_x(0)"
          @touchend.prevent="setStripSwitch_x(0, item)"
        >
          <div class="img-block">
            <img :src="item.url" alt @mousedown.prevent />
            <div class="img-item-info flex-side flex-middle-y">
              <div class="title text-cut">{{ item.title }}</div>
              <div class="icon" v-show="item.mediaShow">
                <img :src="mediaIcon" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- **************************** 指示器 **************************** -->
      <div class="img-pots flex" v-show="config.pots">
        <div
          class="pot"
          v-for="(p, index) in config.images"
          :key="index"
          :style="{ 'background-color': index === indexNumber ? 'white' : '' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: {
        type: Object,
        default: () => {
          return {
            pots: true,
            auto: true,
            imageRate: 1,
            gap: 0,
            images: [],
          }
        },
      },
    },
    data() {
      return {
        // 容器相关
        htmlFontSize: 16,
        frameWidth: 0,
        mediaIcon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABKZJREFUaAXdm0uLHUUYhnPiqFGySAJZGAkIZsCIi2QxoDvduBNBcKcgiP9DEVRw4Q13ij/BpSHgXggkQYQsZtyoiYqaySJqhEnG56lUFdOnT5/bVF/OfPBO9enuqvqe+qqqqy8zOtSC7e7uHqbY41FHSdURtBZFcmgn6g7p7aht0u3RaHSPtKiNSpUGnBCPocfRCfQAWsbukukmuo5+BdoG2bftGxRAo3UGnULLwjWBCH0DbQFs1Je2pUEBfJRazyIBuzCBrwH8zzKVLQwax58RXEeOxS7NsbuJjPBC43ghUCCdUDbQMdSn3aLyS8A6kc1lc4MCKZyQwg7BhBRW6Jk2FyiQjsPzqOuuOgvA7nsFWMfvVJsJCqTj0UlnyOYktTXNwakRAtJr4tAh5Tsbe10jayMoGR2T5xpzDu/A+ejzRM8mgpIhza4Tj08sqf+d+roRfa95UwPhxJCBM4cyu9acnrIjBCgyVE6rgXLUycduu6qm7zJUrAJKS7isc8Wz6rYeWTJHBZS9zrDj+/LJK7QhQ+VqkaFoAe9Culqgd9FmpyJTqCuD8qvWrwt48xRlvIaeQ3vrKlD0XEVkpjVPh9y0dDS9Br+D0urrR7Y/Qj+hrsyo/sCqaSe1sk8GSt80v0CZCVKwJ5Ggr6JUL5utmkyy5Qpd6pU2Z/Bxe5Adr6MP0enxgy39DmyHCa2t6zOeLs1L2MfoFdR2dE/IaCU+rSvdbSlyphndN9AHqI0eRbHBZDueQOO+XhJn5k/Qy2jvmC7pTAD1+tm3PYQDb6L3UZg8Cjt01IgOATRxPc3Gp+iltKNQGkBd8Q/JHsaZt9B7qNQkecSIhkUD6dDsGRx6u5BTa0MGlfEJVCKqAdQCh2p/4titEs4Z0SIvcUo4M1bGb/x+Fy30RH6sjPRzx/EpqBfvodgujnyDvkL/FXIqgPrE+5FCBe63mN8p4DP0/X4LGst/x4j6Os5lYN92AQeM4r8tOHI7gbZQ9txF/sGZRvHq3DkWPzGA+jq9L7tIxV+iNqK4l2nbiAp6F7nK78r+oiKjeLmDCmXbXuMxwz3u1/xm4GThSpveTH9LPV+gvwvX11TcTRmNqHYdlQb9jjJ9nJLMxvwcXUo7Okplu3//R0QFfhGV7r7PU+az6Bf0NeoqilQVzG570Ydj+UYXWJ/anb5//MD8/RnIMJu7BEy2lTYOUJqZMijkLhxmviJfoUa4EZmCyxk0AlwjLbGI7rs9ZJAlWwWUFvCSsJmPru7GZmTJBBXQuNd+XeQeMNfS7Ya+57GZqq6B0hKG3WuddzWrZvrst0e14VcDlYwTQwY2axk8PlALAYq+11ycCOpZZLALXKnlGO4OP6xqHHKNoPKQ0ctNZfYaKKcfVE29NOaV0TQAVk2+GzmHpjbMtDJaOmZ3vQpkWM9Oq2MuUAsA9hjJBhrKA+808TR2V/1ONjeoGYAVUlih+zTh2vmMNVEBa/c9g9ZR113ZruqCpt0Pk6kgG8AH+1PzTBo3APZtnBH2Y4/S97PeTzqb9vfPA1ReMYC9effdpjO070uWhRZueP8OglM1i+PYZ8XKiCsnMhtDaTtRzp6t/4PP/yXkHeni6kv2AAAAAElFTkSuQmCC',
        // Strip参数相关
        stripAllowMove: false,
        stripWidth: 0,
        stripLeftMax: 0,
        stripUnitStyleWidth: 0,
        // Strip移动相关
        stripDisStart: 0,
        stripLeftStart: 0,
        stripDisValueMock: 0,
        stripDisValue: 0,
        // 坐标相关
        indexNumber: 0,
        indexTimer: null,
      }
    },
    watch: {
      config: {
        handler(val, old) {
          // Rem单位相关
          this.htmlFontSize = parseInt(
            document.getElementsByTagName('html')[0].style.fontSize
          )
          // 主逻辑
          this.setStripUnit(val)
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {
      // 自动轮播计时器
      if (this.config.auto) this.autoPlayX()
      this.setStripUnit()
    },
    beforeDestroy() {
      if (this.indexTimer) clearInterval(this.indexTimer)
    },
    methods: {
      // *********************************** 横向主方法区 ***********************************
      // 此轮播图原理：所有图片包裹在关键Strip中，通过定位移动Strip来实现轮播
      // * Strip宽度必须大于容器宽度
      // 鼠标按下：Strip允许移动
      // 鼠标移动：Strip开始移动
      // 鼠标松开/离开：Strip禁止移动，根据移动偏移量重新设置Strip位置
      setStripSwitch_x(bool, swiperItem) {
        if (this.stripAllowMove === bool) return
        if (bool) {
          // 鼠标按下
          if (this.indexTimer) clearInterval(this.indexTimer)
          this.stripAllowMove = 1
          let tempClientX = event.clientX || event.targetTouches[0].clientX
          this.stripDisStart = tempClientX
        } else {
          // 鼠标松开/离开
          this.stripAllowMove = 0
          this.resetStripLocation_x(swiperItem, event)
          this.stripLeftStart = this.stripDisValue
        }
      },
      // 鼠标移动：Strip开始根据鼠标事件移动
      setStripLocation_x() {
        if (!this.stripAllowMove) return
        let tempClientX = event.clientX || event.targetTouches[0].clientX
        this.stripDisValueMock = tempClientX - this.stripDisStart // 如果偏移量 > 5% 则进入下一图 否则就返回 (1)
        this.stripDisValue = this.stripLeftStart + this.stripDisValueMock
      },
      // 鼠标松开/离开：开始重新设置Strip位置
      resetStripLocation_x(swiperItem, event) {
        //
        if (event.changedTouches) {
          let clickMockGap = Math.abs(
            event.changedTouches[0].clientX - this.stripDisStart
          )
          if (clickMockGap < 15) {
            // console.log("mousedown mock click", swiperItem);
            this.$emit('clickAction', swiperItem)
          }
        }
        //
        let direction = this.stripDisValueMock > 0 ? 1 : -1 // 负数说明Strip需要向后移动
        let isMoveOver =
          Math.abs(this.stripDisValueMock) / this.frameWidth > 0.1 // * 如果偏移量 > 5% 则进入下一图 (3)
        if (isMoveOver) {
          let targetIndex = this.indexNumber
          targetIndex += -direction
          let leftEnd =
            this.stripLeftStart + this.stripUnitStyleWidth * direction // 目标偏移量
          // * 如果在左边缘
          if (leftEnd > 0) {
            leftEnd = 0
            targetIndex = 0
          }
          // * 偏移量的不能超出最大值
          if (leftEnd <= this.stripLeftMax) {
            leftEnd = this.stripLeftMax
          }
          // * 如果Strip已为极限值 且希望向右移动
          if (this.stripLeftStart === this.stripLeftMax && direction === 1) {
            if (this.stripUnitStyleWidth <= this.frameWidth) {
              let gap =
                this.stripUnitStyleWidth -
                (this.frameWidth % this.stripUnitStyleWidth)
              leftEnd = this.stripLeftStart + gap
            }
          }
          // * 坐标不能为 images 长度
          if (targetIndex > this.config.images.length - 1) {
            targetIndex = this.config.images.length - 1
          }
          // * 实际移动
          this.stripDisValue = leftEnd
          this.indexNumber = targetIndex
        } else {
          this.stripDisValue = this.stripLeftStart
        }
      },
      autoPlayX() {
        if (this.indexTimer) clearInterval(this.indexTimer)
        this.indexTimer = setInterval(() => {
          let imageLength = this.config.images.length
          let targetIndex = this.indexNumber
          targetIndex++
          // 到达末尾要返回开头
          if (targetIndex > imageLength - 1) {
            targetIndex = 0
          }
          // 需要完全到达末尾
          this.indexNumber = targetIndex
          let leftEnd = this.indexNumber * this.stripUnitStyleWidth * -1
          if (targetIndex === imageLength - 1) {
            leftEnd = this.stripLeftMax
          }
          //
          if (leftEnd < this.stripLeftMax) leftEnd = this.stripLeftMax
          this.stripDisValue = leftEnd
        }, 2000)
      },
      // *********************************** 辅助方法区 ***********************************
      setStripUnit(val) {
        let config = val || this.config
        let gap = config.gap || 0
        if (!this.frameWidth && this.$el) {
          this.frameWidth = this.$el.clientWidth
        }
        let unitWidth = this.frameWidth * config.imageRate + gap
        //
        this.stripWidth = config.images.length * unitWidth - gap
        this.stripLeftMax = this.frameWidth - this.stripWidth
        this.stripUnitStyleWidth = unitWidth
      },
      swiperAction(data) {
        this.$emit('clickAction', data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // @import "public.less";
  /* prettier-ignore */
  .img-frame {
  width: 100%;
  overflow: hidden;
  position: relative;
  .img-strip {
    position: relative;
    .img-item {
      width: 100%;
      position: relative;
      overflow: hidden;
      transition: transform 0.5s;
      background-color: rgba(255, 255, 255, 0.3);
      .img-block {
        position: relative;
        img {
          display: block;
          width: 100%;
        }
        .img-item-info {
          width: 100%;
          position: absolute;
          padding: 0rem 12PX 12PX;
          left: 0PX;
          bottom: 0PX;
          color: white;
          .title {
            width: 100%;
            margin-right: 1rem;
          }
          .icon {
            img {
              width: 2rem;
              height: 2rem;
            }
          }
        }
      }
    }
  }
  .img-pots {
    position: absolute;
    bottom: 1rem;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    .pot {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0rem 0.2rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
