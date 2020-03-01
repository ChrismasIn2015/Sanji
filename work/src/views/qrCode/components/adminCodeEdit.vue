<template>
  <div class="adminEdit">
    <!-- 编辑活码表单 -->
    <div class="create-form">
      <div class="form-line flex-middle-y">
        <div class="line-name">活码类型：</div>
        <div class="line-content">
          <div
            class="common-btn-toggle"
            :class="{'common-btn-toggle-on':adminCode.adminType === 0}"
            @click.stop="adminCode.adminType = 0"
          >群聊码</div>
          <div
            class="common-btn-toggle"
            :class="{'common-btn-toggle-on':adminCode.adminType === 1}"
            @click.stop="adminCode.adminType = 1"
          >客服码</div>
        </div>
      </div>
      <div class="form-line flex-middle-y">
        <div class="line-name">活码页标题：</div>
        <div class="line-content">
          <commonInput ref="adminTitle" :state="{ type:'none', holder:'活码页的页面标题，请输入1～24个字' }" />
        </div>
      </div>
      <div class="form-line flex-middle-y">
        <div class="line-name">活码备注(选填)：</div>
        <div class="line-content">
          <commonInput ref="adminTip" :state="{ type:'none', holder:'为了方便您管理活码，该备注不会对外显示' }" />
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name">活码设置：</div>
        <div class="line-content">
          <div class="con-checkBox-plus" :class="{'con-checkBox-on': adminCode.modes.noRepeat}">
            <div class="box-pot"></div>
            <div class="box-content" @click.stop="setAdminModes('noRepeat')">
              <div class="con-line title">{{ adminCode.adminType === 0 ? '防止重复入群' : '防止重复添加'}}</div>
              <div class="con-line">用户扫码获得微信群码后，后续扫码仅展示所获二维码（无论活码是否有切换/调整）</div>
            </div>
          </div>
          <!-- <div class="con-checkBox-plus" :class="{'con-checkBox-on': modes.administrator}">
                <div class="box-pot"></div>
                <div class="box-content" @click.stop="setAdminModes('administrator')">
                  <div class="con-line title">管理员微信</div>
                  <div class="con-line">管理员微信绑定后，扫码不受防重复功能影响，且不对其使用数据统计</div>
                </div>
          </div>-->
          <div class="con-checkBox-plus" :class="{'con-checkBox-on': adminCode.modes.safeTip}">
            <div class="box-pot"></div>
            <div class="box-content" @click.stop="setAdminModes('safeTip')">
              <div class="con-line title">安全验证提示</div>
              <div class="con-line">在活码页顶部增加安全验证信息，来增加可信度{{ adminCode.customerServiceLocal }}</div>
            </div>
          </div>
          <div
            class="con-checkBox-plus"
            :class="{'con-checkBox-on': adminCode.customerServiceLocalShow }"
          >
            <div class="box-pot"></div>
            <div class="box-content">
              <div class="con-line title" @click.stop="setAdminModes('customerService')">客服功能</div>
              <div
                v-show="adminCode.customerServiceLocalShow"
                class="common-btn"
                @click.stop="toSetCustomServer"
              >上传客服码</div>
              <div v-show="adminCode.customerServiceLocal && adminCode.customerServiceLocalShow">
                <img :src="adminCode.customerServiceLocal" alt />
              </div>
              <div class="con-line">在活码页底部增加客服联系方式，必要时为用户联系客服提供帮助活码活动结束后，默认展示已设置客服微信</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
import { getAdminCode } from "@/views/qrCode/components/qrCodeType";

export default {
  data() {
    return {
      // 这个组件仅仅用于存储/修改/返回业务数据 全部需要父组件驱动
      adminCode: {
        // 创建值
        adminType: 0, // 0 群聊集合 1 客服集合
        adminTitle: "",
        adminRemark: "",
        modes: {
          noRepeat: false,
          administrator: false,
          safeTip: false,
          customerService: ""
        },
        invalidDate: "",
        adminShowType: 0, // 子码展示模式 0 标准 1 轮播
        // 其他
        customerServiceFile: null,
        customerServiceLocal: "",
        customerServiceLocalShow: false,
        // API
        id: -1
      }
    };
  },
  mounted() {
    // this.initAdminCode();
  },
  components: {
    commonInput
  },
  methods: {
    // 初始化自身（AdminCode）的数据
    initAdminCode(editValue) {
      if (editValue) {
        // 创建值
        this.adminCode.adminType = editValue.adminType; // 0 群聊集合 1 客服集合
        this.adminCode.adminTitle = editValue.adminTitle;
        this.adminCode.adminRemark = editValue.adminRemark;
        this.adminCode.modes = editValue.modes;
        this.adminCode.invalidDate = editValue.invalidDate;
        this.adminCode.adminShowType = editValue.adminShowType; // 子码展示模式 0 标准 1 轮播
        // 其他
        // this.adminCode.customerServiceFile = editValue.customerServiceFile;
        this.adminCode.customerServiceLocal = editValue.customerServiceLocal;
        this.adminCode.customerServiceLocalShow =
          editValue.customerServiceLocalShow;
        // API
        this.adminCode.id = editValue.id ? editValue.id : -1;
        // UI值
        this.$refs.adminTitle.inputValue = editValue.adminTitle;
        this.$refs.adminTip.inputValue = editValue.adminTip;
      } else {
        this.adminCode = Object.assign({}, getAdminCode());
        // UI值
        this.$refs.adminTitle.inputValue = "";
        this.$refs.adminTip.inputValue = "";
      }
      this.$test.log("初始化 AdminCode", this.adminCode);
    },
    // 返回自身（AdminCode）的数据
    getMyAdminCode() {
      if (this.$refs.adminTitle.inputVerify()) return false;
      if (
        this.adminCode.customerServiceLocalShow &&
        !this.adminCode.customerServiceFile
      ) {
        window.alert("请上传客服微信");
        return false;
      }
      let myAdminCode = this.adminCode; // 注意：H5取得的 File 对象引用不能丢失（如克隆拷贝）
      myAdminCode.adminTitle = this.$refs.adminTitle.inputValue;
      myAdminCode.adminRemark = this.$refs.adminTip.inputValue;
      this.$test.log("取得活码参数", myAdminCode);
      return myAdminCode;
    },
    // 获取本地图片 - 客服微信
    toSetCustomServer() {
      let tag = document.createElement("input");
      tag.type = "file";
      tag.accept = "image/*";
      tag.ref = "file";
      tag.style.display = "none";
      tag.addEventListener("change", () => {
        this.adminCode.customerServiceFile = event.target.files[0];
        this.adminCode.customerServiceLocal = window.URL.createObjectURL(
          this.adminCode.customerServiceFile
        );
      });
      tag.click();
    },
    // 样式
    setAdminModes(key) {
      if (key === "customerService") {
        this.adminCode.customerServiceLocalShow = !this.adminCode
          .customerServiceLocalShow;
        return;
      }
      this.adminCode.modes[key] = !this.adminCode.modes[key];
    }
  }
};
</script>

<style lang="scss" scoped>
.create-form {
  margin: 0rem 15.75rem;
  color: $common-tip;
  .form-line {
    margin-bottom: 1.5rem;
    line-height: 1rem;
    .line-name {
      width: 8.5rem;
      cursor: default;
      color: $common-tip-higher;
    }
    .line-content {
      width: 65%;
      img {
        width: 8rem;
        height: 8rem;
        margin-right: 1rem;
        margin-top: 1rem;
      }
      .common-btn-toggle {
        margin-right: 1rem;
      }
      .common-btn-toggle-on {
        background-color: $common-main;
        color: $common-white;
      }
      .con-checkBox {
        cursor: pointer;
        position: relative;
        margin-bottom: 1rem;
        .box-pot {
          width: 1rem;
          height: 1rem;
          position: absolute;
          border-radius: 1rem;
          border: 0.35rem solid $common-tip;
        }
        .box-name {
          margin-left: 1.5rem;
        }
        &:last-child {
          margin-bottom: 0rem;
        }
      }
      .con-checkBox-plus {
        cursor: pointer;
        position: relative;
        margin-bottom: 1.5rem;
        .box-pot {
          width: 1rem;
          height: 1rem;
          position: absolute;
          border: 1px solid $common-tip;
        }
        .con-line {
          margin-left: 1.5rem;
          margin-bottom: 0.6rem;
        }
        .title {
          color: $common-tip-higher;
          margin-bottom: 0.5rem;
        }
        &:last-child {
          margin-bottom: 0rem;
        }
        .common-btn {
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .box-content {
          img {
            width: 10rem;
            height: 10rem;
            border: 1px solid $common-tip;
            margin-left: 1.5rem;
            margin-bottom: 0.5rem;
          }
        }
      }
      .con-checkBox-on {
        .box-pot {
          border: 0.35rem solid $common-main;
        }
        .box-name {
          color: $common-black;
        }
      }
      .con-tip {
        cursor: default;
        margin-top: 1.2rem;
        color: $common-tip;
      }
      .con-input {
        width: 30%;
      }
    }
  }
}
</style>
