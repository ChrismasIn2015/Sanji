<template>
  <div class="uiBoard">
    <!-- 导航1 -->
    <indexEntry />
    <!-- UI展示 -->
    <h2>目前PC常用UI</h2>
    <div class="board-ad flex">
      <div class="ad flex-middle-y" v-for="(item, index) in pcUIList" :key="index" @click.stop="copyURL(item.url)">
        <img :src="item.icon" alt />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <h2>目前移动端常用UI</h2>
    <div class="board-ad flex">
      <div class="ad flex-middle-y" v-for="(item, index) in mobileUIList" :key="index" @click.stop="copyURL(item.url)">
        <img :src="item.icon" alt />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!-- SanJi UI -->

    <!-- 1 -->
    <h2>* 轮播图</h2>
    <div class="board-mine">
      <div style="width: 30rem;">
        <sjSwiperX :config="swiperConfigX" />
      </div>
    </div>
    <div class="board-mine">
      <div style="width: 30rem;">
        <sjSwiperY :config="swiperConfigX" />
      </div>
    </div>
    <h2>* 提示</h2>
    <div class="board-mine flex">
      <div class="common-btn toggle" @click.stop="showConfirm">用户确认</div>
      <div class="common-btn toggle" @click.stop="showTip">系统提示</div>
    </div>
    <h2>* 按钮</h2>
    <div class="board-mine flex">
      <div class="common-btn">common-btn</div>
      <div class="common-btn red">red</div>
      <div class="common-btn orange">orange</div>
      <div class="common-btn blue">blue</div>
      <div class="common-btn disable">disable</div>
    </div>
    <div class="board-mine flex">
      <div class="common-btn toggle">toggle</div>
      <div class="common-btn tip">tip</div>
      <div class="common-btn red-on">red-on</div>
      <div class="common-btn orange-on">orange-on</div>
      <div class="common-btn blue-on">blue-on</div>
      <div class="common-btn">
        <img :src="mobileUIList[1].icon" alt />
        <span>图标Icon</span>
      </div>
    </div>
    <h2>* 表单</h2>
    <div class="board-mine flex">
      <sjInput :state="{ holder: '默认输入框不允许为空', icon: pcUIList[0].icon }" />
      <sjCalendar />
      <sjInput :state="{ holder: '文本框', type: 'textarea' }" />
    </div>
  </div>
</template>

<script>
  import indexEntry from '@/components/indexEntry/indexEntry.vue'
  import { mouseCopy } from '@/utils/utils.js'
  import sjInput from '@/utils/sanJi-UI/sjInput.vue'
  import sjSwiperX from '@/utils/sanJi-UI/sjSwiperX.vue'
  import sjSwiperY from '@/utils/sanJi-UI/sjSwiperY.vue'
  import sjCalendar from '@/utils/sanJi-UI/sjCalendar.vue'

  export default {
    data() {
      return {
        pcUIList: [
          {
            name: 'Vue Element',
            icon: 'https://element.eleme.cn/2.0/favicon.ico',
            url: 'https://element.eleme.cn/2.0/#/zh-CN',
          },
          {
            name: 'Vue iView',
            icon: 'https://file.iviewui.com/icon/viewlogo.png',
            url: 'https://www.iviewui.com/',
          },
          {
            name: 'React Antd',
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            url: 'https://ant.design/index-cn',
          },
          {
            name: 'Jquery Bs',
            icon: 'https://v4.bootcss.com/docs/assets/img/favicons/apple-touch-icon.png',
            url: 'https://v4.bootcss.com/',
          },
          {
            name: 'Js LayUI',
            icon: 'https://www.layui.com/favicon.ico',
            url: 'https://www.layui.com',
          },
        ],
        mobileUIList: [
          {
            name: 'Vue MintUI',
            icon:
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE3NXB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTc1IDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy44LjIgKDI5NzUzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7nu7/lj7ZAMXg8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMjU2LWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MC4wMDAwMDAsIC0yOC4wMDAwMDApIiBmaWxsPSIjMjZhMmZmIj4KICAgICAgICAgICAgPGcgaWQ9Iue7v+WPtiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4zMDQ2ODgsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBDODIuMTA5MzUsMTUxLjY2MDE1OSA4MC4wMzY0ODA3LDE0Ny4xMTY3MTIgNzcuOTA3NTkzMiwxNDEuNzU1NTIgQzc1Ljc3ODcwNTcsMTQ0LjUwMzU5NyA3My40NTk2MzU3LDE0Ny4yNjc0MjMgNzAuOTU3NTYsMTUwLjA2MzU0NCBMNjYuOTk0NDI4MywxNTQuNTc1MDk1IEw2MS45NzQ1Mjc5LDE1Mi40NTQzOCBDNDcuMzA0MTYyNSwxNDYuMjY2ODcxIDQuNzYyMjk2MDksMTI1LjU4MzgyOSAwLjM3NzczMjYxNyw5Mi4xNzYzMDM1IEMtMi43NTk0ODA4Niw1Ny4zNzA5MTY2IDE3LjYwNTc5MzIsMzkuMDg2NDg2MSAxMC4yNDI5MDA0LDE5LjczNzcxMTcgQzM5Ljk0MTA3MDUsMjYuODM4NjU0OSA2My4zNTY0NDA4LDM4LjMzOTkxMDQgNzguMzM2NjAwMiw1My4wNTc5MjExIEMxMDEuODM5Mjg3LDIzLjA1NzkzMDkgMTMxLjk0Mjk0LDIxLjg4MjM0OCAxMzkuOTcyNjY4LDAgQzE5NS43MzkzOTMsNzcuOTQyNzE5OSAxODYuODQzMjc5LDE0OS4xODk5OCA5My44ODgzMDM5LDE2MC42NzQ4ODkgQzg2LjAyNTIzNTQsMTc1LjEzOTEyMyA3Ny4yNjQyODIsMTg4LjU3MDExMyA2Ny43NDA4MDQ5LDIwMCBMNTQuNzA2NzI2NiwxOTEuOTA2MjggQzY1Ljg4MjIzOTUsMTgxLjE3NTUyMyA3NS40NDU1ODczLDE2OC42NDk3OTQgODMuNzI5NDg5NSwxNTUuMDExODc2IEw4My43Mjk0ODk1LDE1NS4wMTE4NzYgTDgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBaIE05Mi42OTcxNzE1LDExNi4xNzk3NjQgQzk0LjYzNTI3ODUsMTIxLjM5ODAyMSA5Ni42MjEwMzA3LDEyNS42MjM1IDk3Ljg5OTg3ODMsMTI4LjE4ODc3MSBDMTExLjQzNDUzMSw5OC44MDA1OTQ1IDEyMC42NzE5MzgsNjYuNjYzOTQyMiAxMjguMTE0MzcyLDM3LjA2OTAzNjkgQzEyMC4wOTIwMjEsNDUuNDA4OTU3MiAxMDQuNjM1NDA4LDQ4LjY2NTU4MyA5Mi41MzA1MTI3LDY1LjQzMjkzOTMgQzkxLjc2ODE4NzksNjYuNTc2NjI1OCA5MS4xMDA1NTU5LDY3Ljc2MDE4MjYgOTAuNTA1Mjg4Nyw2OC45Njc0NjI3IEM5OC4wNjY3MzY1LDgyLjk3MDU5NDUgOTkuMjI2MTcxOSw5OC45NDM3Mjk3IDkyLjY5NzE3MTUsMTE2LjE3OTc2NCBMOTIuNjk3MTcxNSwxMTYuMTc5NzY0IEw5Mi42OTcxNzE1LDExNi4xNzk3NjQgWiBNNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEM0Ny40NjI4NDczLDk5LjA2Mjc0MzQgNDAuNTEyODE0MSw3Mi40MzgzOTI2IDI4LjM1MjQ5ODYsNDguODgwMDg2MyBMMjguMzUyNDk4Niw0OC44ODAwODYzIEM0MS4zMzA5NTc2LDY2Ljk5NzY1ODYgNTYuNDA2NDA3Niw5My4yNjQ1Njk5IDY0LjM5Njg2MjUsMTIyLjk5NDIzOCBDOTIuNDM1MDIyNyw4OS43NjE1NDQzIDc0LjA5NTE3MjEsNTQuOTQwMjA5MiAyMi4zODc0NjcsNDIuNTg5MzEyNSBDMjcuMTkyODYzOSw1NS4yMjY0Nzk3IDEzLjg4ODY2MjcsNjcuMTcyMjkxNiAxNS45Mzc4MDksODkuOTEyNjUzNSBDMTguOTU2MDA5LDExMi44NTkzNDYgNDQuNjI3MjU0NSwxMjQuNDg3Nzg4IDUyLjYwOTczNTQsMTI3LjcxMjMxOCBMNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEw1Mi42MDk3MzU0LDEyNy43MTIzMTggWiBNMTA4Ljc4MTM0NiwxMjkuNjkwMjk2IEMxNTkuNzEwNTc5LDEyMC45MjEzNjggMTY1LjQ0NTE1OSw4MC42ODMwMjIzIDEzNS44MTA3ODEsMzUuNzkwMTg5MyBDMTMyLjAyOTg1OCw2Mi45NTQ1ODY1IDEyMi41OTM4OTcsOTcuMTg4MjI5OSAxMDguNzgxMzQ2LDEyOS42OTAyOTYgTDEwOC43ODEzNDYsMTI5LjY5MDI5NiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
            url: 'https://mint-ui.github.io/#!/zh-cn',
          },
          {
            name: 'Vue CubeUI',
            icon: 'https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico',
            url: 'https://didi.github.io/cube-ui/#/zh-CN',
          },
          {
            name: 'Vue Vant',
            icon: 'https://img.yzcdn.cn/vant/logo.png',
            url: 'https://youzan.github.io/vant/#/zh-CN',
          },
        ],
        alertShow: false,
        swiperConfigX: {
          pots: 0,
          imageRate: 1,
          gap: 20,
          auto: 0,
          images: [
            {
              url: 'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-28/jtour_op_sys_1590635334878.jpg',
              '3d': 0,
              title: '暂时只支持文字A',

              mediaShow: 1,
            },
            {
              url: 'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-28/jtour_op_sys_1590635334878.jpg',
              '3d': 0,
              title: '暂时只支持文字A',
            },
            {
              url: 'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-22/jtour_op_sys_1590111262923.png',
              '3d': 0,
              title: '暂时只支持文字A',
            },
            {
              url: 'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-28/jtour_op_sys_1590635334878.jpg',
              '3d': 0,
              title: '暂时只支持文字A',
            },
          ],
        },
      }
    },
    components: {
      sjInput,
      sjCalendar,
      sjSwiperX,
      sjSwiperY,
      indexEntry,
    },
    methods: {
      copyURL(url) {
        mouseCopy(url, (res) => {
          this.$invoker.openBrower(url)
        })
      },
      toIndex() {
        this.$router.push({ name: 'index' })
      },
      showConfirm() {
        this.$confirm({ title: '自定义标题', content: '在main.js中进行了全局挂载' }, (res) => {
          console.log(`点击了 ${res ? '确定' : '取消'}`)
        })
      },
      showTip() {
        this.$tip('这是一条系统提示')
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './styles/uiBoard.scss';
</style>
