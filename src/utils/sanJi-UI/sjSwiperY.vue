<template>
  <div>
    <div class="img-frame">
      <!-- **************************** 纵向轮播图 **************************** -->
      <!-- **************************** 暂时只支持文字 **************************** -->
      <div
        class="img-strip"
        :style="{
          transition: `top ${stripAllowMove ? '0s' : '0.1s'}`,
          top: `${stripDisValue / htmlFontSize}rem`,
        }"
      >
        <div
          class="img-item flex-middle-y"
          v-for="(item, index) in config.images"
          :key="index"
          @mousedown.prevent="setStripSwitch_x(1)"
          @touchstart.prevent="setStripSwitch_x(1)"
          @mousemove.prevent="setStripLocation_x"
          @touchmove.prevent="setStripLocation_x"
          @mouseleave.prevent="setStripSwitch_x(0)"
          @touchcancel.prevent="setStripSwitch_x(0)"
          @mouseup.prevent="setStripSwitch_x(0, item)"
          @touchend.prevent="setStripSwitch_x(0, item)"
        >
          <span>{{ item.title }}</span>
        </div>
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
            images: [],
          }
        },
      },
    },
    data() {
      return {
        // 容器相关
        htmlFontSize: 16,
        mediaIcon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAABKZJREFUaAXdm0uLHUUYhnPiqFGySAJZGAkIZsCIi2QxoDvduBNBcKcgiP9DEVRw4Q13ij/BpSHgXggkQYQsZtyoiYqaySJqhEnG56lUFdOnT5/bVF/OfPBO9enuqvqe+qqqqy8zOtSC7e7uHqbY41FHSdURtBZFcmgn6g7p7aht0u3RaHSPtKiNSpUGnBCPocfRCfQAWsbukukmuo5+BdoG2bftGxRAo3UGnULLwjWBCH0DbQFs1Je2pUEBfJRazyIBuzCBrwH8zzKVLQwax58RXEeOxS7NsbuJjPBC43ghUCCdUDbQMdSn3aLyS8A6kc1lc4MCKZyQwg7BhBRW6Jk2FyiQjsPzqOuuOgvA7nsFWMfvVJsJCqTj0UlnyOYktTXNwakRAtJr4tAh5Tsbe10jayMoGR2T5xpzDu/A+ejzRM8mgpIhza4Tj08sqf+d+roRfa95UwPhxJCBM4cyu9acnrIjBCgyVE6rgXLUycduu6qm7zJUrAJKS7isc8Wz6rYeWTJHBZS9zrDj+/LJK7QhQ+VqkaFoAe9Culqgd9FmpyJTqCuD8qvWrwt48xRlvIaeQ3vrKlD0XEVkpjVPh9y0dDS9Br+D0urrR7Y/Qj+hrsyo/sCqaSe1sk8GSt80v0CZCVKwJ5Ggr6JUL5utmkyy5Qpd6pU2Z/Bxe5Adr6MP0enxgy39DmyHCa2t6zOeLs1L2MfoFdR2dE/IaCU+rSvdbSlyphndN9AHqI0eRbHBZDueQOO+XhJn5k/Qy2jvmC7pTAD1+tm3PYQDb6L3UZg8Cjt01IgOATRxPc3Gp+iltKNQGkBd8Q/JHsaZt9B7qNQkecSIhkUD6dDsGRx6u5BTa0MGlfEJVCKqAdQCh2p/4titEs4Z0SIvcUo4M1bGb/x+Fy30RH6sjPRzx/EpqBfvodgujnyDvkL/FXIqgPrE+5FCBe63mN8p4DP0/X4LGst/x4j6Os5lYN92AQeM4r8tOHI7gbZQ9txF/sGZRvHq3DkWPzGA+jq9L7tIxV+iNqK4l2nbiAp6F7nK78r+oiKjeLmDCmXbXuMxwz3u1/xm4GThSpveTH9LPV+gvwvX11TcTRmNqHYdlQb9jjJ9nJLMxvwcXUo7Okplu3//R0QFfhGV7r7PU+az6Bf0NeoqilQVzG570Ydj+UYXWJ/anb5//MD8/RnIMJu7BEy2lTYOUJqZMijkLhxmviJfoUa4EZmCyxk0AlwjLbGI7rs9ZJAlWwWUFvCSsJmPru7GZmTJBBXQuNd+XeQeMNfS7Ya+57GZqq6B0hKG3WuddzWrZvrst0e14VcDlYwTQwY2axk8PlALAYq+11ycCOpZZLALXKnlGO4OP6xqHHKNoPKQ0ctNZfYaKKcfVE29NOaV0TQAVk2+GzmHpjbMtDJaOmZ3vQpkWM9Oq2MuUAsA9hjJBhrKA+808TR2V/1ONjeoGYAVUlih+zTh2vmMNVEBa/c9g9ZR113ZruqCpt0Pk6kgG8AH+1PzTBo3APZtnBH2Y4/S97PeTzqb9vfPA1ReMYC9effdpjO070uWhRZueP8OglM1i+PYZ8XKiCsnMhtDaTtRzp6t/4PP/yXkHeni6kv2AAAAAElFTkSuQmCC',
        // Strip参数相关
        stripAllowMove: false,
        stripWidth: 0,
        stripTopMax: 0,
        // Strip移动相关
        stripDisStart: 0,
        stripTopStart: 0,
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
      if (this.config.auto) this.autoPlayY()
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
          let tempClientY = event.clientY || event.targetTouches[0].clientY
          this.stripDisStart = tempClientY
        } else {
          // 鼠标松开/离开
          this.stripAllowMove = 0
          this.resetStripLocation_y(swiperItem, event)
          this.stripTopStart = this.stripDisValue
        }
      },
      // 鼠标移动：Strip开始根据鼠标事件移动
      setStripLocation_x() {
        if (!this.stripAllowMove) return
        let tempClientY = event.clientY || event.targetTouches[0].clientY
        this.stripDisValueMock = tempClientY - this.stripDisStart // 如果偏移量 > 5% 则进入下一图 否则就返回 (1)
        this.stripDisValue = this.stripTopStart + this.stripDisValueMock
      },
      // 鼠标松开/离开：开始重新设置Strip位置
      resetStripLocation_y(swiperItem, event) {
        //
        if (event.changedTouches) {
          let clickMockGap = Math.abs(
            event.changedTouches[0].clientY - this.stripDisStart
          )
          console.log(clickMockGap)
          if (clickMockGap < 5) {
            // console.log("mousedown mock click", swiperItem);
            let temp = {
              linkType: 'product',
              productList: [
                { productTypeName: '资讯', productId: swiperItem.infoId },
              ],
            }
            this.$emit('clickAction', temp)
          }
        }
        //
        let direction = this.stripDisValueMock > 0 ? 1 : -1 // 负数说明Strip需要向后移动
        let isMoveOver = Math.abs(this.stripDisValueMock) > 0.05 // * 如果偏移量 > 5% 则进入下一图 (3)
        if (isMoveOver) {
          let targetIndex = this.indexNumber
          targetIndex += -direction
          let topEnd = this.stripTopStart + this.htmlFontSize * 2.5 * direction // 目标偏移量
          // * 如果在左边缘
          if (topEnd > 0) {
            topEnd = 0
            targetIndex = 0
          }
          // * 偏移量的不能超出最大值
          if (topEnd <= this.stripTopMax) {
            topEnd = this.stripTopMax
          }
          // * 坐标不能为 images 长度
          if (targetIndex > this.config.images.length - 1) {
            targetIndex = this.config.images.length - 1
          }
          //   // * 实际移动
          this.stripDisValue = topEnd
          this.indexNumber = targetIndex
        } else {
          this.stripDisValue = this.stripTopStart
        }
      },
      autoPlayY() {
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
          let topEnd = this.indexNumber * this.stripUnitStyleWidth * -1
          if (targetIndex === imageLength - 1) {
            topEnd = this.stripTopMax
          }
          this.stripDisValue = topEnd
        }, 1000)
      },
      // *********************************** 辅助方法区 ***********************************
      setStripUnit(val) {
        let config = val || this.config
        let unitHeight = this.htmlFontSize * 2.5
        this.stripUnitStyleWidth = unitHeight
        this.stripWidth = config.images.length * unitHeight
        this.stripTopMax = unitHeight - this.stripWidth
      },
      swiperAction(data) {
        this.$emit('clickAction', data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // @import 'public.less';
  .img-frame {
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    .img-strip {
      position: relative;
      width: auto;
      .img-item {
        font-size: 1rem;
        line-height: 2.5rem;
        width: 100%;
        overflow: hidden;
        transition: transform 0.5s;
      }
    }
  }
</style>
