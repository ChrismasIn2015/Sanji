<template>
  <div class="qrCode-admin" v-show="pageShow" @click.stop="contextState.show = false">
    <!-- 1.活码列表 -->
    <div class="qrCode-table" v-show="adminType === 0">
      <!-- 表格头部按钮 -->
      <div class="table-nav flex-middle-y">
        <div class="common-btn" @click.stop="setBarVector">+ 创建活码</div>
        <!-- <commonInput /> -->
      </div>
      <div class="table-list">
        <!-- 表格第一行 -->
        <div class="table-row title flex-side">
          <div class="table-column flex-middle-y">活码</div>
          <div class="table-column flex-middle-y">类型</div>
          <div class="table-column flex-middle-y">二维码数量</div>
          <div class="table-column flex-middle-y">今日使用数据</div>
          <div class="table-column flex-middle-y">累计使用人数</div>
          <div class="table-column flex-middle-y">剩余可长按数</div>
          <div class="table-column flex-middle-y">操作</div>
        </div>
        <!-- 表格内容 -->
        <div class="table-row flex-side" v-for="(adminCode, index) in qrGroupList" :key="index">
          <div class="table-column flex-middle-y">
            <div class="qrGroup-imageBox">
              <div class="flex-middle-y">
                <span>{{ adminCode.adminTitle }}</span>
                <span v-show="adminCode.adminRemark">({{ adminCode.adminRemark }})</span>
                <img :src="adminCode.adminImage" alt />
              </div>
              <div>
                <div class="common-btn-tip" @click.stop="downAdminCode(adminCode.adminImage)">下载二维码</div>
                <div
                  class="common-btn-tip"
                  @click.stop="copyAdminCode(this,adminCode.adminImage)"
                >复制链接</div>
              </div>
            </div>
          </div>
          <div class="table-column flex-middle-y">{{ qrGroupTypes[adminCode.adminType] }}</div>
          <div class="table-column flex-middle-y">{{ adminCode.childCount }}</div>
          <div class="table-column flex-middle-y">
            <div>
              <div>扫码{{ adminCode.counts.adminScanCount }}人</div>
              <div>长按{{ adminCode.counts.childTouchCount }}人</div>
            </div>
          </div>
          <div class="table-column flex-middle-y">
            <div>
              <div>扫码{{ adminCode.counts.adminScanCount }}人</div>
              <div>长按{{ adminCode.counts.childTouchCount }}人</div>
            </div>
          </div>
          <div class="table-column flex-middle-y">{{ adminCode.counts.canUserCount }}</div>
          <div class="table-column flex-middle-y">
            <div class="common-link" @click.stop="getChildsList(adminCode)">二维码管理</div>
            <div class="common-link" @click.stop="showContextMenus(adminCode)">更多</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑活码 -->
    <div class="tempModal flex-middle" v-if="adminCodeEditShow">
      <div style="background-color: white; max-height: 70%; padding: 2rem;">
        <adminCodeEdit ref="adminCodeEdit" />
        <div
          class="common-btn"
          style="display:block; width:30%; margin:1rem auto;"
          @click.stop="postAdminCode"
        >修改</div>
        <div
          class="common-btn"
          style="display:block; width:30%; margin:1rem auto;"
          @click.stop="closeAdminCodeEdit"
        >返回</div>
      </div>
    </div>

    <!-- 2.管理界面B -->
    <div v-show="adminType === 1">
      <!-- Tabs -->
      <div class="admin-tabs flex-middle-y">
        <div class="tab" v-for="(tab, index) in tabList" :key="index">{{ tab }}</div>
      </div>
      <!-- 表格 -->
      <div class="qrCode-table">
        <!-- 使用了 qrCode-ui.scss 的样式，具体以后改进 -->
        <!-- 表格头部按钮 -->
        <div class="table-nav flex-middle-y">
          <div class="common-btn">+ 添加群聊码</div>
          <!-- <div class="nav-switch flex-middle-y">
            <div class="switch-name">轮播模式</div>
            <div class="switch-btn">
              <span class="btn"></span>
            </div>
          </div>-->
          <div style="margin-left: auto">
            <!-- <div class="common-btn-toggle">有效期</div> -->
            <!-- <div class="common-btn-toggle">自动切换频率</div> -->
            <!-- <div class="common-btn-toggle">删除</div> -->
            <div class="common-btn-toggle" @click.stop="adminType = 0">返回</div>
          </div>
        </div>
        <div class="table-list">
          <!-- 表格第一行 -->
          <div class="table-row title flex-side">
            <div class="table-column flex-middle" style="width: 3%;">
              <div class="column-checkBox"></div>
            </div>
            <div class="table-column flex-middle-y">微信二维码</div>
            <div class="table-column flex-middle-y">二维码缩略图</div>
            <div class="table-column flex-middle-y">自动切换频率</div>
            <div class="table-column flex-middle-y">有效期至</div>
            <div class="table-column flex-middle-y">展示模式</div>
            <!-- <div class="table-column flex-middle-y">位置排序</div> -->
            <div class="table-column flex-middle-y">操作</div>
          </div>
          <!-- 表格内容 -->
          <div class="table-row flex-side" v-for="(code, index) in qrCodeList" :key="index">
            <div class="table-column flex-middle" style="width: 3%;">
              <div class="column-checkBox"></div>
            </div>
            <div class="table-column flex-middle-y">{{ code.childImageName }}</div>
            <div class="table-column flex-middle-y">
              <img class="main-image" :src="code.childImageUrl" alt />
            </div>
            <div class="table-column flex-middle-y">{{ code.childFrequency }}</div>
            <div
              class="table-column flex-middle-y"
            >{{ code.invalidDate ? code.invalidDate.substring(0, 10) : "" }}</div>
            <div class="table-column flex-middle-y">{{ gainModeMap[code.gainMode] }}</div>
            <!-- <div class="table-column flex-middle-y"> -->
            <!-- <img class="sort-image" src="../../static/images/sort-up.png" alt="" @click.stop="sortQrCodeList(index, false)"> -->
            <!-- <img class="sort-image" src="../../static/images/sort-up.png" alt />
              <img class="sort-image" src="../../static/images/sort-down.png" alt />
            </div>-->
            <div class="table-column flex-middle-y">
              <!-- <div class="common-link">编辑</div> -->
              <div class="common-link" @click.stop="deleteMyChildCode(code.id)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载界面 -->
    <qrCodeModal v-show="loadding" @action="showModal" />

    <!-- 公共 -->
    <pageMenus
      :state="contextState"
      :menuList="contextStateMenus"
      @deleteMyAdminCode="deleteMyAdminCode"
      @setAdminCodeEditObj="setAdminCodeEditObj"
    />
  </div>
</template>

<script>
import adminCodeEdit from "@/views/qrCode/components/adminCodeEdit.vue";
// import childCodeEdit from "@/views/qrCode/components/childCodeEdit.vue";
import pageMenus from "@/components/qrCodeMenus";
import {
  // getAdminCodeList,
  editAdminCode,
  deleteAdminCode,
  deleteChildCode,
  getChildCodeList,
  postImage
} from "@/utils/http/api-qrCode.js";
import qrCodeModal from "@/components/qrCodeModal.vue";
// import { getAdminCodeList,deleteAdminCode,getChildCodeList,editChildCode, getAdminShowType, setAdminShowType,sortChildCodeList,deleteChildCode } from "@/utils/http/api-qrCode.js"

export default {
  props: {
    pageShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 全局
      loadding: false,
      adminType: 0, // 0 父二维码管理 1 子二维码列表管理
      adminCodeDown: "",
      contextState: {
        top: 0,
        left: 0,
        pointer: null,
        show: false
      },
      contextStateMenus: [
        // { name: "分日数据", actionName: "" },
        { name: "设置", actionName: "setAdminCodeEditObj" },
        { name: "删除", actionName: "deleteMyAdminCode" }
      ],
      // 1.父二维码管理
      adminCodeEditShow: false,
      qrGroupList: [],
      qrGroupTypes: ["群聊码", "客服码"],

      // 2.某个父二维码的子二维码列表管理
      tempAdminCode: {},
      qrCodeList: [],
      gainModeMap: ["标准", "轮播"],
      tabList: ["正在使用", "即将到期", "已经使用", "已经过期", "所有二维码"]
    };
  },
  components: {
    // commonInput,
    pageMenus,
    qrCodeModal,
    adminCodeEdit
  },
  watch: {
    pageShow(value) {
      value ? this.initAdminCodes() : ""; // ASYNC
    }
  },
  methods: {
    async postAdminCode() {
      try {
        let code = this.$refs.adminCodeEdit.getAdminCode();
        if (code === false) return;
        // 上传客服微信
        if (code.modes.customerServiceFile) {
          let formdata = new FormData();
          formdata.append(
            "file",
            code.modes.customerServiceFile,
            code.modes.customerServiceFile.name
          );
          let tempUrl = await postImage(formdata);
          code.modes.customerService = tempUrl;
          this.$test.log("上传客服微信成功", code.modes.customerService);
        }
        // 请求修改活码
        this.$test.log("修改活码 参数", code);
        await editAdminCode(
          code.id,
          code.adminType,
          code.adminTitle,
          code.modes,
          code.adminShowType,
          code.invalidDate
        );
        this.$test.log("修改活码成功");
        this.initAdminCodes(); // async
        this.adminCodeEditShow = false;
      } catch (error) {
        window.alert(error);
        this.adminCodeEditShow = false;
      }
    },
    closeAdminCodeEdit() {
      this.adminCodeEditShow = false;
    },
    setAdminCodeEditObj(item) {
      this.contextState.show = false;
      this.$store.commit("setTempParams", item);
      this.adminCodeEditShow = true;
    },
    async initAdminCodes() {
      // try {
      //   this.showModal();
      //   this.qrCodeList = [];
      //   let list = await getAdminCodeList();
      //   this.$test.log("获取父二维码列表成功", list);
      //   this.qrGroupList = Object.assign([], list);
      //   this.adminType = 0;
      //   this.showModal();
      // } catch (error) {
      //   this.showModal();
      //   window.alert(error);
      // }
      let list = [
        {
          adminType: 0,
          adminTitle: "1",
          adminRemark: "11",
          id: 0,
          adminImage: "http://qiniu.shenshoukeji.net/qrcode202002130245.svg",
          childCount: 12,
          counts: {
            adminScanCount: 8, // 活码扫码计数
            childTouchCount: 98 // 子码长按计数
          },
          canUserCount: 98 // 剩余可长按数
        }
      ];
      this.qrGroupList = Object.assign([], list);
    },
    async deleteMyAdminCode(item) {
      try {
        let response = window.confirm("确定要删除吗？");
        if (response) {
          await deleteAdminCode(item.id);
          this.contextState.show = false;
          this.initAdminCodes(); // async
          this.$test.log("删除活码成功");
        }
      } catch (error) {
        window.alert(error);
      }
    },
    async getChildsList(item) {
      try {
        this.showModal();
        this.tempAdminCode = item;
        this.qrCodeList = [];
        let list = await getChildCodeList(item.id);
        this.$test.log("设置父二维码", this.tempAdminCode);
        this.$test.log("获取子二维码列表成功", list);
        this.qrCodeList = Object.assign([], list);
        this.adminType = 1;
        this.showModal();
      } catch (error) {
        this.showModal();
        window.alert(error);
      }
    },
    async deleteMyChildCode(id) {
      try {
        let response = window.confirm("确定要删除吗？");
        if (response) {
          await deleteChildCode(this.tempAdminCode.id, id);
          this.initAdminCodes(); // async
          this.$test.log("删除子码成功");
        }
      } catch (error) {
        window.alert(error);
      }
    },
    downAdminCode(url) {
      // this.adminCodeDown = url;
      // window.location.href = url;
      let tag = document.createElement("a");
      // let localUrl = window.URL.createObjectURL(url);
      let localUrl = url;
      tag.href = localUrl;
      tag.target = "_blank";
      tag.download = "code";
      tag.click();
      // window.URL.revokeObjectURL(localUrl);
    },
    copyAdminCode(target, url) {
      let transfer = document.createElement("input");
      document.body.appendChild(transfer);
      transfer.value = url; // 这里表示想要复制的内容
      transfer.focus();
      transfer.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      transfer.blur();
      document.body.removeChild(transfer);
      window.alert("复制成功", url);
    },
    // 样式
    setBarVector() {
      this.$parent.setBarActive({ 0: 2, 1: 0 });
    },
    showModal() {
      this.loadding = !this.loadding;
    },
    showContextMenus(item) {
      let style = {
        top: event.layerY,
        left: event.layerX,
        pointer: item,
        show: !this.contextState.show
      };
      this.contextState = Object.assign({}, style);
    }
  }
};
</script>

<style lang="scss" scoped>
.tempModal {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
.qrCode-admin {
  background-color: $common-white;
  margin: 1.5rem;
  padding: 1.5rem;
  position: relative;
  .admin-tabs {
    margin-bottom: 2rem;
    .tab {
      cursor: pointer;
    }
  }
  // 表格头部特殊样式A
  .qrGroup-imageBox {
    span {
      &:nth-child(2) {
        color: $common-tip-lower;
      }
    }
    img {
      width: 1rem;
      margin-left: 0.5rem;
      height: 1rem;
    }
    .common-btn-tip {
      padding: 0.3rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
    }
  }
}
</style>
