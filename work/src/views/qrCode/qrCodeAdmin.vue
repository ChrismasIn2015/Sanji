<template>
  <div class="qrCode-admin" v-show="pageShow" @click.stop="contextState.show = false">

    <!-- 1.管理界面A -->
    <div class="qrCode-table" v-show="adminType === 0">
      <!-- 使用了 qrCode-ui.scss 的样式，具体以后改进 -->
      <!-- 表格头部按钮 -->
      <div class="table-nav flex-middle-y">
        <div class="common-btn" @click.stop="setBarVector">+ 创建活码</div>
        <commonInput />
      </div>
      <div class="table-list">
        <!-- 表格第一行 -->
        <div class="table-row title flex-side">
          <div class="table-column flex-middle-y">微信二维码</div>
          <div class="table-column flex-middle-y">类型</div>
          <div class="table-column flex-middle-y">二维码数量</div>
          <div class="table-column flex-middle-y">今日使用数据</div>
          <div class="table-column flex-middle-y">累计使用人数</div>
          <!-- <div class="table-column flex-middle-y">剩余可长按数</div> -->
          <div class="table-column flex-middle-y">操作</div>
        </div>
        <!-- 表格内容 -->
        <div class="table-row flex-side" v-for="(group, index) in qrGroupList" :key="index">
          <div class="table-column flex-middle-y">
            <div class="qrGroup-imageBox">
              <span>{{ group.image.name }}</span>
              <span v-show="group.image.remarkName"> ({{ group.image.remarkName }})</span>
              <img src="../../static/images/logo-green.png" alt="">
              <div class="common-btn-tip">下载二维码</div>
              <div class="common-btn-tip">复制链接</div>
            </div>
          </div>
          <div class="table-column flex-middle-y">{{ qrGroupTypes[group.groupType] }}</div>
          <div class="table-column flex-middle-y">{{ group.groupCount.codesCount }}</div>
          <div class="table-column flex-middle-y">{{ group.groupCount.scanCount }}</div>
          <div class="table-column flex-middle-y">{{ group.groupCount.totalScanCount }}</div>
          <div class="table-column flex-middle-y">
            <div class="common-link" @click.stop="adminType = 1">二维码管理</div>
            <div class="common-link" @click.stop="showContextMenus">更多</div>
          </div>
        </div>
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
          <div class="nav-switch flex-middle-y">
            <div class="switch-name">轮播模式</div>
            <div class="switch-btn">
              <span class="btn"></span>
            </div>
          </div>
          <div style="margin-left: auto">
            <div class="common-btn-toggle">有效期</div>
            <div class="common-btn-toggle">自动切换频率</div>
            <div class="common-btn-toggle">删除</div>
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
            <div class="table-column flex-middle-y">位置排序</div>
            <div class="table-column flex-middle-y">操作</div>
          </div>
          <!-- 表格内容 -->
          <div class="table-row flex-side" v-for="(code, index) in qrCodeList" :key="index">
            <div class="table-column flex-middle" style="width: 3%;">
              <div class="column-checkBox"></div>
            </div>
            <div class="table-column flex-middle-y">{{ code.name }}</div>
            <div class="table-column flex-middle-y">
              <img class="main-image" :src="code.qrCodeImage" alt=""></div>
            <div class="table-column flex-middle-y">{{ code.frequency }}</div>
            <div class="table-column flex-middle-y">{{ code.endDateTime }}</div>
            <div class="table-column flex-middle-y">{{ gainModeMap[code.gainMode] }}</div>
            <div class="table-column flex-middle-y">
              <img class="sort-image" :src="code.qrCodeImage" alt="">
              <img class="sort-image" :src="code.qrCodeImage" alt="">
              <img class="sort-image" :src="code.qrCodeImage" alt="">
              <img class="sort-image" :src="code.qrCodeImage" alt="">
            </div>
            <div class="table-column flex-middle-y">
              <div class="common-link">编辑</div>
              <div class="common-link">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 公共 -->
    <pageMenus :state="contextState" :menuList="contextStateMenus" />
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
import pageMenus from "@/components/qrCodeMenus";
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
      adminType: 0, // 0 父二维码管理 1 子二维码列表管理
      contextState: {
        top: 0,
        left: 0,
        pointer: null,
        show: false
      },
      contextStateMenus: [
        { name: "分日数据", actionName: "" },
        { name: "设置", actionName: "" },
        { name: "删除", actionName: "" }
      ],
      // 1.父二维码管理
      qrGroupList: [
        {
          image: {
            name: "图片名称",
            remarkName: "备注",
            link: "来源/下载链接"
          },
          groupType: 0, // 0 群聊码 1 客服码
          groupCount: {
            codesCount: 0, // 子二维码计数
            scanCount: 0, // 扫码计数
            totalScanCount: 0 // 扫码计数合计
          }
        },
        {
          image: {
            name: "图片名称",
            remarkName: "备注",
            link: "来源/下载链接"
          },
          groupType: 0, // 0 群聊码 1 客服码
          groupCount: {
            codesCount: 0, // 子二维码计数
            scanCount: 0, // 扫码计数
            totalScanCount: 0 // 扫码计数合计
          }
        }
      ],
      qrGroupTypes: ["群聊码", "客服码"],

      // 2.某个父二维码的子二维码列表管理
      qrCodeList: [
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        },
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        },
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        },
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        },
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        },
        {
          name: "子二维码名称子二维码名称子二维码名称",
          qrCodeImage: require("../../static/images/logo-green.png"),
          frequency: 180,
          endDateTime: "AAAA-AA-AA",
          gainMode: 0 // 0 标准 1 循环 2 轮播
        }
      ],
      gainModeMap: ["标准", "循环", "轮播"],
      tabList: ["正在使用", "即将到期", "已经使用", "已经过期", "所有二维码"]
    };
  },
  components: {
    commonInput,
    pageMenus
  },
  watch: {
    pageShow(value) {
      value ? console.log("codeAdmin on show") : "";
    }
  },
  methods: {
    initAdminType() {
      this.adminType = 0;
      // this.qrCodeList = [];
    },
    // 样式
    setBarVector() {
      this.$parent.setBarVector(2, 1);
    },
    showContextMenus() {
      let style = {
        top: event.layerY,
        left: event.layerX,
        pointer: null,
        show: !this.contextState.show
      };
      this.contextState = Object.assign({}, style);
    }
  }
};
</script>

<style lang="scss" scoped>
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
