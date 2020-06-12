<template>
  <div>
    <div
      class="img-frame"
      :style="{ height: `${config.height / htmlFontSize}rem` }"
    >
      <!-- **************************** 横向轮播图 **************************** -->
      <div
        class="img-strip flex-middle-y"
        v-if="config.type === 'x'"
        :style="{
          left: `${stripDisValue / htmlFontSize}rem`,
          width: `${stripWidth / htmlFontSize}rem`,
        }"
        @mousedown.stop="setStripSwitch_x(1)"
        @mouseup.stop="setStripSwitch_x(0)"
        @mouseleave.stop="setStripSwitch_x(0)"
        @mousemove.stop="setStripLocation_x"
      >
        <div
          class="img-item flex-middle"
          v-for="(item, index) in config.images"
          :key="index"
          :style="{
            width: `${stripUnitStyleWidth / htmlFontSize}rem`,
            'margin-right': `${
              index !== config.images.length - 1 ? config.gap / 16 : 0
            }rem`,
            'border-radius': `${item['radius'] ? 1 : 0}rem}`,
            'font-size': `${item.fontSize / htmlFontSize}rem`,
            transform: `scale(${
              indexNumber === index && item['3d'] ? 0.8 : 1
            })`,
          }"
          @click.stop="swiperAction(item)"
        >
          <img :src="item.url" alt="" @mousedown.prevent />
          <div class="img-item-info flex-side flex-middle-y">
            <div class="title text-cut">
              {{ item.title }}
            </div>
            <div class="icon" v-show="item.mediaShow">
              <img :src="mediaIcon" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- **************************** 纵向轮播图 <目前仅仅支持文字> **************************** -->
      <div
        class="img-strip"
        v-if="config.type === 'y'"
        :style="{
          top: `${stripDisValue / htmlFontSize}rem`,
        }"
        @mousedown.stop="setStripSwitch_y(1)"
        @mouseup.stop="setStripSwitch_y(0)"
        @mouseleave.stop="setStripSwitch_y(0)"
        @mousemove.stop="setStripLocation_y"
      >
        <div
          class="img-item flex-middle-y"
          v-for="(item, index) in config.images"
          :key="index"
          :style="{
            width: `${stripUnitStyleWidth / htmlFontSize}rem`,
          }"
          @click.stop="swiperAction(item)"
        >
          <div class="text-cut">{{ item.title }}</div>
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
            type: 'x', // x 横向 y 纵向
            height: 0,
            itemWidth: 0,
            gap: 0,
            images: [],
            pots: true,
            auto: true,
          }
        },
      },
    },
    data() {
      return {
        // 容器相关
        htmlFontSize: 16,
        frameWidth: 0,
        stripUnitStyleWidth: 0,
        mediaIcon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABKZJREFUaAXdm0uLHUUYhnPiqFGySAJZGAkIZsCIi2QxoDvduBNBcKcgiP9DEVRw4Q13ij/BpSHgXggkQYQsZtyoiYqaySJqhEnG56lUFdOnT5/bVF/OfPBO9enuqvqe+qqqqy8zOtSC7e7uHqbY41FHSdURtBZFcmgn6g7p7aht0u3RaHSPtKiNSpUGnBCPocfRCfQAWsbukukmuo5+BdoG2bftGxRAo3UGnULLwjWBCH0DbQFs1Je2pUEBfJRazyIBuzCBrwH8zzKVLQwax58RXEeOxS7NsbuJjPBC43ghUCCdUDbQMdSn3aLyS8A6kc1lc4MCKZyQwg7BhBRW6Jk2FyiQjsPzqOuuOgvA7nsFWMfvVJsJCqTj0UlnyOYktTXNwakRAtJr4tAh5Tsbe10jayMoGR2T5xpzDu/A+ejzRM8mgpIhza4Tj08sqf+d+roRfa95UwPhxJCBM4cyu9acnrIjBCgyVE6rgXLUycduu6qm7zJUrAJKS7isc8Wz6rYeWTJHBZS9zrDj+/LJK7QhQ+VqkaFoAe9Culqgd9FmpyJTqCuD8qvWrwt48xRlvIaeQ3vrKlD0XEVkpjVPh9y0dDS9Br+D0urrR7Y/Qj+hrsyo/sCqaSe1sk8GSt80v0CZCVKwJ5Ggr6JUL5utmkyy5Qpd6pU2Z/Bxe5Adr6MP0enxgy39DmyHCa2t6zOeLs1L2MfoFdR2dE/IaCU+rSvdbSlyphndN9AHqI0eRbHBZDueQOO+XhJn5k/Qy2jvmC7pTAD1+tm3PYQDb6L3UZg8Cjt01IgOATRxPc3Gp+iltKNQGkBd8Q/JHsaZt9B7qNQkecSIhkUD6dDsGRx6u5BTa0MGlfEJVCKqAdQCh2p/4titEs4Z0SIvcUo4M1bGb/x+Fy30RH6sjPRzx/EpqBfvodgujnyDvkL/FXIqgPrE+5FCBe63mN8p4DP0/X4LGst/x4j6Os5lYN92AQeM4r8tOHI7gbZQ9txF/sGZRvHq3DkWPzGA+jq9L7tIxV+iNqK4l2nbiAp6F7nK78r+oiKjeLmDCmXbXuMxwz3u1/xm4GThSpveTH9LPV+gvwvX11TcTRmNqHYdlQb9jjJ9nJLMxvwcXUo7Okplu3//R0QFfhGV7r7PU+az6Bf0NeoqilQVzG570Ydj+UYXWJ/anb5//MD8/RnIMJu7BEy2lTYOUJqZMijkLhxmviJfoUa4EZmCyxk0AlwjLbGI7rs9ZJAlWwWUFvCSsJmPru7GZmTJBBXQuNd+XeQeMNfS7Ya+57GZqq6B0hKG3WuddzWrZvrst0e14VcDlYwTQwY2axk8PlALAYq+11ycCOpZZLALXKnlGO4OP6xqHHKNoPKQ0ctNZfYaKKcfVE29NOaV0TQAVk2+GzmHpjbMtDJaOmZ3vQpkWM9Oq2MuUAsA9hjJBhrKA+808TR2V/1ONjeoGYAVUlih+zTh2vmMNVEBa/c9g9ZR113ZruqCpt0Pk6kgG8AH+1PzTBo3APZtnBH2Y4/S97PeTzqb9vfPA1ReMYC9effdpjO070uWhRZueP8OglM1i+PYZ8XKiCsnMhtDaTtRzp6t/4PP/yXkHeni6kv2AAAAAElFTkSuQmCC',
        // Strip相关1
        stripWidth: 0,
        stripLeftMax: 0,
        stripTopMax: 0,
        // Strip相关2
        stripAllowMove: false,
        stripDisStart: 0,
        stripDisValueMock: 0,
        stripDisValue: 0,
        stripLeftStart: 0,
        stripTopStart: 0,
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
          let myItemWidth = val.itemWidth
          if (val.gap) {
            myItemWidth += val.gap
          }
          this.stripUnitStyleWidth = myItemWidth
          this.stripWidth = val.images.length * myItemWidth - val.gap
          this.stripLeftMax = this.frameWidth - this.stripWidth
          this.stripTopMax = val.height * (val.images.length - 1) * -1
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {
      // 自动轮播计时器
      if (this.config.type === 'x') this.autoPlayX()
      // 取得轮播图宽度px
      this.frameWidth = this.$el.clientWidth
      this.stripLeftMax = this.frameWidth - this.stripWidth
      this.stripTopMax =
        this.config.height * (this.config.images.length - 1) * -1
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
      setStripSwitch_x(bool) {
        if (this.stripAllowMove === bool) return
        if (bool) {
          // 鼠标按下
          if (this.indexTimer) clearInterval(this.indexTimer)
          this.stripAllowMove = 1
          this.stripDisStart = event.clientX
        } else {
          // 鼠标松开/离开
          this.stripAllowMove = 0
          this.resetStripLocation_x()
          this.stripLeftStart = this.stripDisValue
        }
      },
      // 鼠标移动：Strip开始根据鼠标事件移动
      setStripLocation_x() {
        if (!this.stripAllowMove) return
        this.stripDisValueMock = event.clientX - this.stripDisStart // 如果偏移量 > 5% 则进入下一图 否则就返回 (1)
        this.stripDisValue = this.stripLeftStart + this.stripDisValueMock
      },
      // 鼠标松开/离开：开始重新设置Strip位置
      resetStripLocation_x() {
        let direction = this.stripDisValueMock > 0 ? 1 : -1 // 负数说明Strip需要向后移动
        let isMoveOver = Math.abs(this.stripDisValueMock) > 0.05 // * 如果偏移量 > 5% 则进入下一图 (3)
        if (isMoveOver) {
          let targetIndex = this.indexNumber
          targetIndex += -direction
          let leftEnd =
            this.stripLeftStart + this.stripUnitStyleWidth * direction // 目标偏移量
          // * 如果在左边缘
          if (leftEnd > 0) {
            leftEnd = this.stripLeftStart
            targetIndex = 0
          }
          // * 偏移量的不能超出最大值
          if (leftEnd <= this.stripLeftMax) {
            leftEnd = this.stripLeftMax
            targetIndex = this.config.images.length - 1
          }
          // * 如果Strip已为极限值 且希望向右移动
          if (this.stripLeftStart === this.stripLeftMax && direction === 1) {
            let gap =
              (this.frameWidth % this.stripUnitStyleWidth) + this.config.gap
            leftEnd -= gap
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
          let gap = 0
          let targetIndex = this.indexNumber
          // 到达末尾要返回开头
          if (targetIndex++ === this.config.images.length - 1) {
            targetIndex = 0
          }
          // 需要完全到达末尾
          if (targetIndex === this.config.images.length - 1) {
            gap = (this.frameWidth % this.stripUnitStyleWidth) + this.config.gap
          }
          this.indexNumber = targetIndex
          this.stripDisValue =
            this.indexNumber * this.stripUnitStyleWidth * -1 + gap
        }, 1000)
      },
      // *********************************** 纵向主方法区 ***********************************
      setStripSwitch_y(bool) {
        if (this.stripAllowMove === bool) return
        if (bool) {
          // 鼠标按下
          this.stripAllowMove = 1
          this.stripDisStart = event.clientY
        } else {
          // 鼠标松开/离开
          this.stripAllowMove = 0
          this.resetStripLocation_y()
          this.stripTopStart = this.stripDisValue
        }
      },
      setStripLocation_y() {
        if (!this.stripAllowMove) return
        this.stripDisValueMock = event.clientY - this.stripDisStart // 如果偏移量 > 5% 则进入下一图 否则就返回 (1)
        this.stripDisValue = this.stripTopStart + this.stripDisValueMock
      },
      resetStripLocation_y() {
        let direction = this.stripDisValueMock > 0 ? 1 : -1 // 负数说明Strip需要向后移动
        let isMoveOver = Math.abs(this.stripDisValueMock) > 0.05 // * 如果偏移量 > 5% 则进入下一图 (3)
        if (isMoveOver) {
          let targetIndex = this.indexNumber
          targetIndex += -direction
          let topEnd = this.stripTopStart + this.config.height * direction // 目标偏移量
          // * 如果在上边缘
          if (topEnd > 0) {
            topEnd = this.stripTopStart
            targetIndex = 0
          }
          // * 偏移量的不能超出最大值
          if (topEnd <= this.stripTopMax) {
            topEnd = this.stripTopMax
            targetIndex = this.config.images.length - 1
          }
          // * 实际移动
          this.stripDisValue = topEnd
          this.indexNumber = targetIndex
        } else {
          this.stripDisValue = this.stripTopStart
        }
      },
      autoPlayY() {
        if (this.indexTimer) clearInterval(this.indexTimer)
      },
      // *********************************** 辅助方法区 ***********************************
      swiperAction(item) {
        // console.log(item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .img-frame {
    width: 100%;
    overflow: hidden;
    position: relative;
    .img-strip {
      position: relative;
      width: auto;
      height: 100%;
      transition: all 0.2s;
      .img-item {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        img {
          height: 100%;
        }
        .img-item-info {
          width: 100%;
          position: absolute;
          padding: 0rem 1.5rem 1rem;
          left: 0px;
          bottom: 0px;
          color: white;
          .title {
            width: 100%;
            margin-right: 1rem;
          }
          .icon {
            img {
              width: 3rem;
              height: 3rem;
            }
          }
        }
        &:last-child {
          margin-right: 0px;
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
        width: 0.8rem;
        height: 0.8rem;
        margin: 0rem 0.25rem;
        border-radius: 0.8rem;
        transition: all 0.2s;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
