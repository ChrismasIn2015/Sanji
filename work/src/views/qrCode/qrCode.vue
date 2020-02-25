<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="nav">
      <div class="nav-content">
        <!-- 左侧 Icon -->
        <div class="icon">
          <img src="../../static/images/logo.png" alt />
          <span class="icon-word">处处有码</span>
        </div>
        <!-- 右侧 按钮 -->
        <div class="menus">
          <div class="menu" @click.stop="goto('http://www.weixu88.com/')">微续官网</div>
          <div class="menu red-menu" @click.stop="accountReset">注销</div>
        </div>
      </div>
    </div>

    <!-- 营销二维码区 -->
    <div class="qrCode">
      <!-- 二维码 头部导航条 -->
      <div class="qrCode-nav">
        <div class="form-btn" @click.stop="toQrCodeCreate(null)">制作营销二维码</div>
        <div class="nav-tip">
          共有
          <span class="tip-on">{{ qrGroupList.length }}</span>条二维码信息
        </div>
        <div class="nav-tip" v-show="!qrGroupList.length">{{ listTip }}</div>
      </div>
      <!-- 二维码 内容区 -->
      <div class="qrCode-list">
        <div
          class="qrCode-item"
          v-for="(item, index) in qrGroupList"
          :key="index"
          @click.stop="toQrCodeCreate(item)"
        >
          <div class="qrCode-name text-cut">{{ item.name }}</div>
          <img :src="item.codeImg" alt="获取中" />
          <div class="qrCode-menu">
            <div class="left"></div>
            <div class="right" @click.stop="deleteMyQrGroup(item.id)">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQrGroupList, deleteQrGroup } from "@/utils/apis";
export default {
  data() {
    return {
      listTip: "您还未创建营销二维码！",
      qrGroupList: []
    };
  },
  mounted() {
    this.getMyQrGroupList();
  },
  computed: {
    openId() {
      return this.$store.getters.getOpenId;
    }
  },
  methods: {
    // 获取父二维码列表
    async getMyQrGroupList() {
      try {
        let list = await getQrGroupList(this.openId);
        this.qrGroupList = Object.assign([], list);
      } catch (e) {
        this.listTip = e;
        window.alert(e);
      }
    },
    // 删除父二维码
    deleteMyQrGroup(id) {
      let callback = window.confirm("确认要删除吗？");
      if (callback) {
        this.deleteMGroupConfirm(id);
      }
    },
    async deleteMGroupConfirm(id) {
      try {
        await deleteQrGroup([id]);
        let list = await getQrGroupList(this.openId);
        this.qrGroupList = Object.assign([], list);
      } catch (e) {
        this.listTip = e;
        window.alert(e);
      }
    },
    // 查看父二维码内容
    toQrCodeCreate(params) {
      if (!params) params = null;
      this.$store.commit("setTempParams", params);
      this.$router.push({ name: "qrCodeCreate" });
    },
    goto(url) {
      window.open(url);
    },
    accountReset() {
      this.$store.commit("setToken", null);
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  //
  .nav {
    background-color: rgb(34, 35, 37);
    height: 50px;
    margin-bottom: 50px;
    padding: 0px 10px;
    .nav-content {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .icon {
        height: 50px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .icon-word {
          color: $common-main;
          &:hover {
            color: white;
          }
        }
      }
      .menus {
        margin-left: auto;
        .menu {
          display: inline-block;
          line-height: 50px;
          height: 50px;
          color: $common-main;
          padding: 0 5px;
          cursor: pointer;
          &:hover {
            color: white;
          }
        }
        .red-menu {
          color: red;
        }
      }
    }
  }
  //
  .qrCode {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0px 10px;
    .qrCode-nav {
      .form-btn {
        width: 150px;
      }
      .nav-tip {
        cursor: default;
        padding: 0px 5px;
        height: 50px;
        line-height: 50px;
        .tip-on {
          padding: 0px 5px;
          color: rgb(234, 167, 16);
        }
      }
    }
    .qrCode-list {
      display: flex;
      flex-wrap: wrap;
      .qrCode-item {
        margin: 10px 5px 10px 0px;
        width: 240px;
        background-color: white;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 0px 5px 2px $common-main;
        }
        .qrCode-name {
          margin: 0 auto;
          width: 200px;
          margin-bottom: 10px;
        }
        img {
          width: 210px;
          height: 210px;
        }
      }
      .qrCode-menu {
        display: flex;
        justify-content: space-between;
        .left {
          cursor: pointer;
          color: $common-main;
        }
        .right {
          cursor: pointer;
          color: red;
          border-bottom: 1px solid transparent;
          &:hover {
            border-bottom: 1px solid red;
          }
        }
      }
    }
  }
}
@media (max-width: 550px) {
  .qrCode-list {
    justify-content: center;
  }
}
</style>
