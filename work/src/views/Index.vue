<template>
  <div class="admin flex">
    <!-- 1.左侧导航条 -->
    <div class="admin-bar" v-show="barListShow">
      <div class="bar-title flex-middle-y">
        <img src="../static/images/logo-green.png" alt />
        <span>微续（处处有码）</span>
      </div>
      <div class="bar-list">
        <div v-for="(item, index) in barList" :key="index">
          <div
            class="bar"
            :class="{'bar-on': item.activeStyle}"
            @click.stop="setBarActive({0:index, 1:-1})"
          >
            <div class="pot" v-show="item.activeStyle"></div>
            <div class="flex-middle-y">
              <img :src="item.icon" alt />
              <span class="name">{{ item.name }}</span>
            </div>
          </div>
          <div v-show="item.childShow">
            <div
              class="bar bar-child"
              v-for="(child, _index) in item.children"
              :key="_index"
              :class="{'bar-on': child.activeStyle}"
              @click.stop="setBarActive({0:index, 1:_index})"
            >
              <div class="pot" v-show="child.activeStyle"></div>
              <span class="name">{{ child.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2.右侧内容区 -->
    <div class="admin-content flex-y">
      <!-- 固定导航 -->
      <div class="con-nav flex-x-reverse flex-middle-y">
        <div class="nav-item person flex-middle-y" @click.stop="logout">
          <img src="../static/images/user-logo.png" />
          <div>{{ userName }}</div>
        </div>
        <!-- <div class="nav-item message flex-middle-y">
          <img src="../static/images/logo-green.png" />
        </div>-->
        <!-- <div class="nav-item">
          <div class="form-btn">点击续费</div>
        </div>-->
        <!-- <div class="nav-item">基础版：2020-05-02到期</div> -->
        <!-- <img class="nav-item bar-btn" src="../static/images/logo-green.png" alt @click.stop="barListShow = !barListShow" /> -->
      </div>
      <!-- 面包屑 -->
      <div class="con-routes flex-middle-y">{{ tarBarRoutes }}</div>
      <!-- 内容区 -->
      <div class="con-components">
        <indexTools :pageShow="barVector[0] === 0 && barVector[1] === -1" />
        <qrCodeCreate ref="qrCodeCreate" :pageShow="barVector[0] === 2 && barVector[1] === 0" />
        <qrCodeAdmin ref="qrCodeAdmin" :pageShow="barVector[0] === 2 && barVector[1] === 1" />
      </div>
    </div>
  </div>
</template>

<script>
import indexTools from "@/views/indexTools/indexTools.vue";
import qrCodeCreate from "@/views/qrCode/qrCodeCreate.vue";
import qrCodeAdmin from "@/views/qrCode/qrCodeAdmin.vue";
export default {
  data() {
    return {
      // 导航条
      userName: "暂未登录",
      barList: [
        {
          name: "首页",
          icon: require("../static/images/home.png"),
          activeStyle: true,
          childShow: false,
          children: []
        },
        {
          name: "数据概览",
          icon: require("../static/images/data.png"),
          activeStyle: false,
          childShow: false,
          children: []
        },
        {
          name: "活码工具",
          icon: require("../static/images/code.png"),
          activeStyle: false,
          childShow: false,
          children: [
            { name: "创建活码", activeStyle: false },
            { name: "活码管理", activeStyle: false }
          ]
        },
        {
          name: "二维码工具",
          icon: require("../static/images/scan.png"),
          activeStyle: false,
          childShow: false,
          children: []
        }
      ],
      barListShow: true,
      // 内容区
      barVector: { 0: 0, 1: -1 }
    };
  },
  components: {
    indexTools,
    qrCodeCreate,
    qrCodeAdmin
  },
  mounted() {
    let name = localStorage.getItem("qrCodeName");
    this.userName = name ? name : "获取失败";
  },
  computed: {
    // 临时面包屑
    tarBarRoutes() {
      let barName1 = this.barList[this.barVector[0]].name;
      let barName2 = "";
      if (this.barVector[1] > -1) {
        barName2 =
          " / " +
          this.barList[this.barVector[0]].children[this.barVector[1]].name;
      }
      return barName1 + barName2;
    }
  },
  methods: {
    // 点击 Bar
    setBarActive(vector) {
      this.barVector = vector;
      // 1.样式清空
      for (let i = 0; i < this.barList.length; i++) {
        this.barList[i].activeStyle = false;
        let childList = this.barList[i].children;
        for (let j = 0; j < childList.length; j++) {
          childList[j].activeStyle = false;
        }
      }
      // 2.根据 vector 设置内容区
      let bar = this.barList[vector[0]];
      if (bar.children ? bar.children.length : false) {
        // 2.1 有子元素
        if (vector[1] > -1) {
          bar = bar.children[vector[1]];
          bar.activeStyle = !bar.activeStyle; //2.2 希望进入子元素 点亮子元素
        } else {
          bar.childShow = !bar.childShow; //2.2+ 不希望进入子元素 展开子元素
        }
      } else {
        bar.activeStyle = !bar.activeStyle; //2.1+ 没有子元素 点亮父元素
      }
      Object.assign([], this.barList);
    },
    logout() {
      let response = window.confirm("确定要退出吗？");
      if (response) {
        localStorage.setItem("qrCodeToken", null);
        this.$router.push({ name: "qrResult" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  min-height: 100%;
  // 1
  .admin-bar {
    width: 15.625%;
    // width: 18.75rem;
    background-color: rgb(0, 21, 41);
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    .bar-title {
      font-size: 1.2rem;
      padding: 0.8rem 1.2rem;
      color: white;
      background-color: rgb(0, 33, 64);
      cursor: default;
      img {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.4rem;
      }
    }
    .bar {
      color: rgb(175, 175, 175);
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
    // width: 84.375%;
    width: 100%;
    margin-left: 15.625%;
    // 导航条
    .con-nav {
      position: fixed;
      top: 0px;
      right: 0px;
      width: 84.375%;
      padding: 0.5rem 1rem;
      background-color: white;
      z-index: 1;
      .nav-item {
        margin-left: 1rem;
        font-size: 0.9rem;
        color: $common-tip-higher;
        cursor: default;
        img {
          width: 1rem;
          height: 1rem;
        }
        .form-btn {
          border-radius: 0.2rem;
          height: 1.8rem;
          line-height: 1.7rem;
          font-size: 0.9rem;
        }
      }
      .person {
        cursor: pointer;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 5px;
        }
      }
      .message {
        margin-left: 3rem;
        margin-right: 0rem;
        img {
          width: 1rem;
          height: 1rem;
          margin: 0rem 0.5rem;
        }
      }
      .bar-btn {
        width: 1rem;
        height: 1rem;
        margin-left: 0rem;
        margin-right: auto;
        cursor: pointer;
      }
    }
    // 面包屑
    .con-routes {
      z-index: 1;
      position: fixed;
      top: 2.75rem;
      right: 0px;
      cursor: default;
      font-size: 0.9rem;
      width: 84.375%;
      line-height: 1.7rem;
      padding: 0.5rem 1rem;
      background-color: white;
      border-top: 3px solid $common-back;
      border-bottom: 3px solid $common-back;
    }
    .con-components {
      margin-top: 5.5rem;
    }
  }
}
</style>
