<template>
  <!-- 
    # 首页架构
      # 左侧导航条 300
      # 右侧内容区 1620
        # 导航条
        # 面包屑
        # 卡片（组件-内容区）
  -->
  <div class="admin flex">
    <!-- 1.左侧导航条 -->
    <div class="admin-bar" v-show="barShow">
      <div class="bar-title flex-no-side flex-middle-y">
        <img src="../static/images/logo-green.jpg" alt />
        <span>微续 (处处有码)</span>
      </div>
      <div class="bar-list">
        <!-- 1.1 -->
        <div class="bar" @click.stop="barIndex = 1" :class="{'bar-on': barIndex === 1}">
          <div class="pot" v-show="barIndex === 1"></div>
          <div class="flex-middle-y">
            <img src="../static/images/home.png" alt />
            <span class="name">首页</span>
          </div>
        </div>
        <!-- 1.2 -->
        <div class="bar" @click.stop="barIndex = 2" :class="{'bar-on': barIndex === 2}">
          <div class="pot" v-show="barIndex === 2"></div>
          <div class="flex-middle-y">
            <img src="../static/images/data.png" alt />
            <span class="name">数据概览</span>
          </div>
        </div>
        <!-- 1.3 -->
        <div class="bar" @click.stop="index3_show = !index3_show" :class="{'bar-on': barIndex === 3}">
          <div class="pot" v-show="barIndex === 3"></div>
          <div class="flex-middle-y">
            <img src="../static/images/code.png" alt />
            <span class="name">活码工具</span>
            <span class="arrow">{{ index3_show ? "-" : "+" }}</span>
          </div>
        </div>
        <div class="bar bar-child flex-middle-y" @click.stop="barIndex = 4" :class="{'bar-on': barIndex === 4}" v-show="index3_show">
          <div class="pot" v-show="barIndex === 4"></div>
          <span class="name">创建活码</span>
        </div>
        <div class="bar bar-child flex-middle-y" @click.stop="barIndex = 5" :class="{'bar-on': barIndex === 5}" v-show="index3_show">
          <div class="pot" v-show="barIndex === 5"></div>
          <span class="name">活码管理</span>
        </div>
        <!-- 1.4 -->
        <div class="bar" @click.stop="barIndex = 6" :class="{'bar-on': barIndex === 6}">
          <div class="pot" v-show="barIndex === 6"></div>
          <div class="flex-middle-y">
            <img src="../static/images/scan.png" alt />
            <span class="name">二维码工具</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2.右侧内容区 -->
    <div class="admin-content flex-y">
      <div class="con-nav flex-x-reverse">
        <img src="" alt="">
      </div>
      <div class="con-routes"></div>
      <div class="con-card"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barShow: true,
      barIndex: 1, // 暂时使用不优雅的方法实现Bar组件
      index3_show: false // 暂时使用不优雅的方法实现Bar组件
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.admin {
  min-height: 100%;
  // 1
  .admin-bar {
    width: 18.75rem;
    background-color: rgb(0, 21, 41);
    .bar-title {
      font-size: 1.4rem;
      padding: 1.4rem 1.2rem;
      color: white;
      background-color: rgb(0, 33, 64);
      cursor: default;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    .bar {
      color: rgb(175, 175, 175);
      font-size: 1.1rem;
      padding: 1.1rem 0rem;
      position: relative;
      cursor: pointer;
      img {
        width: 1.1rem;
        height: 1.1rem;
        margin: 0rem 1.1rem;
      }
      &:hover {
        background-color: rgb(43, 52, 61);
      }
      .pot {
        position: absolute;
        left: 0rem;
        top: 0rem;
        width: 0.3rem;
        height: 3.6rem;
        background-color: $common-main;
      }
      .arrow {
        margin-left: auto;
        padding-right: 1.1rem;
      }
    }
    .bar-child {
      background-color: rgb(0, 12, 23);
      padding-left: 3.3rem;
    }
    .bar-on {
      background-color: rgb(43, 52, 61);
    }
  }
  // 2
  .admin-content {
    width: 100%;
    .con-nav {
      height: 50px;
      margin-bottom: 2px;
      background-color: white;
    }
    .con-routes {
      height: 50px;
      background-color: white;
    }
    .con-card {
      background-color: white;
      margin: 1rem 1rem 0rem;
      height: 100%;
    }
  }
}
</style>
