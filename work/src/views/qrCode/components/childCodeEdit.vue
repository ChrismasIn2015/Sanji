<template>
  <div class="childEdit">
    <!-- 创建子码 -->
    <div class="create-form">
      <!-- 分割线 -->
      <div class="form-line flex-middle-y">
        <div class="line-name">活码类型：</div>
        <div class="line-content">
          <div
            class="common-btn-toggle"
            :class="{'common-btn-toggle-on': childCode.childType === 0}"
            @click.stop="childCode.childType = 0"
          >微信二维码</div>
          <!-- <div class="common-btn-toggle" :class="{'common-btn-toggle-on': childType === 1}" @click.stop="childType = 1">自制海报</div> -->
        </div>
      </div>
      <!-- 分割线 -->
      <div class="form-line flex">
        <div class="line-name">二维码展示形式：</div>
        <div class="line-content">
          <div
            class="con-checkBox"
            :class="{'con-checkBox-on': childCode.childImageType === 0}"
            @click.stop="childCode.childImageType = 0"
          >
            <div class="box-pot"></div>
            <div class="box-name">标准模式</div>
          </div>
          <div
            class="con-checkBox"
            :class="{'con-checkBox-on': childCode.childImageType === 1}"
            @click.stop="childCode.childImageType = 1"
          >
            <div class="box-pot"></div>
            <div class="box-name">适配模式</div>
          </div>
          <!-- <div class="con-checkBox" :class="{'con-checkBox-on': childImageType === 2}" @click.stop="childImageType = 2">
                <div class="box-pot"></div>
                <div class="box-name">裁剪模式</div>
          </div>-->
        </div>
      </div>
      <div class="form-line flex-middle-y">
        <div class="line-name">二维码名称：</div>
        <div class="line-content">
          <commonInput ref="myChildTitle" :state="{ type:'none', holder:'请输入二维码名称' }" />
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name" style="padding-top: 0.4rem;">添加二维码图片：</div>
        <!-- 新建时 -->
        <div class="line-content">
          <div
            class="common-btn"
            @click.stop="setChildsImages"
          >{{ tempAdminType === 0 ? '+ 上传群聊码' : '+ 上传客服码'}}</div>
          <div class="con-tip">图片小于2M，可多张上传（每次至多500张）</div>
          <img :src="image" alt v-for="(image, index) in childCode.childsImagesLocal" :key="index" />
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name" style="padding-top: 0.4rem;">自定义头像：</div>
        <div class="line-content">
          <div
            class="common-btn"
            @click.stop="setChildLogo"
          >+ 自定义{{tempAdminType === 0 ? '群头像' : '客服头像'}}</div>
          <div class="con-tip">图片小于2M，仅可上传一张</div>
          <img v-show="childCode.childLogoLocal" :src="childCode.childLogoLocal" alt />
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name" style="padding-top: 0.4rem;">自动切换频率：</div>
        <div class="line-content">
          <commonInput
            class="con-input"
            ref="myChildFrequency"
            :state="{ type:'number', holder:'请输入切换频率' }"
          />
          <div class="con-tip">当二维码用户达到该数字时，自动切换下一个二维码，频率建议为150-180</div>
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name" style="padding-top: 0.4rem;">二维码失效日期：</div>
        <div class="line-content">
          <commonInput
            class="con-input"
            ref="myChildDate"
            :state="{ holder:'请输入日期 格式 YYYY-MM-DD', rule:'date' }"
          />
          <div class="con-tip">根据微信群码图片的底部日期填写，到期前系统将提醒您及时更换</div>
        </div>
      </div>
      <div class="form-line flex">
        <div class="line-name" style="padding-top: 0.4rem;">引导文字 (选填)：</div>
        <div class="line-content">
          <commonInput
            ref="myChildTip"
            :state="{ type:'textarea', holder:'二维码下方的引导文字，可输入文字后查看右侧预览图' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
import { getChildCode } from "@/views/qrCode/components/qrCodeType";

export default {
  data() {
    return {
      // 这个组件仅仅用于存储/修改/返回业务数据 全部需要父组件驱动
      childCode: {
        childType: 0, // 0 微信二维码 1 海报
        childImageType: 0, // 0 标准 1 适配
        childLogo: "",
        childTitle: "",
        childsImages: [],
        childFrequency: 0,
        childTip: "",
        // 其他
        childLogoFile: null,
        childLogoLocal: "",
        childImageFile: null,
        childImageLocal: "",
        childsImagesFiles: [],
        childsImagesLocal: [],
        // API
        adminId: -1,
        childId: -1,
        childImageName: "",
        childImageUrl: ""
      },
      tempAdminType: 0
    };
  },
  components: {
    commonInput
  },
  mounted() {
    // this.initChildCode();
  },
  methods: {
    // 初始化自身（childCode）的初始值
    initChildCode(editValue, adminType) {
      if (editValue) {
        this.childCode.childType = editValue.childType; // 0 微信二维码 1 海报
        this.childCode.childImageType = editValue.childImageType; // 0 标准 1 适配
        this.childCode.childLogo = editValue.childLogo;
        this.childCode.childTitle = editValue.childTitle;
        // this.childCode.childsImages = editValue.childsImages;
        this.childCode.childFrequency = editValue.childFrequency;
        this.childCode.childTip = editValue.childTip;
        // 其他
        // this.childCode.childLogoFile = editValue.childLogoFile;
        this.childCode.childLogoLocal = editValue.childLogoLocal;
        // this.childCode.childImageFile = editValue.childImageFile;
        this.childCode.childImageLocal = editValue.childImageLocal;
        // this.childCode.childsImagesFiles = editValue.childsImagesFiles;
        // this.childCode.childsImagesLocal = editValue.childsImagesLocal;
        this.tempAdminType = adminType;
        // API
        this.childCode.adminId = editValue.adminId;
        this.childCode.childId = editValue.childId;
        this.childCode.childImageName = editValue.childImageName;
        this.childCode.childImageUrl = editValue.childImageUrl;
        //UI
        this.$refs.myChildTitle.inputValue = editValue.childTitle;
        this.$refs.myChildFrequency.inputValue = editValue.childFrequency;
        this.$refs.myChildDate.inputValue = editValue.childDate;
        this.$refs.myChildTip.inputValue = editValue.childTip;
      } else {
        this.childCode = Object.assign({}, getChildCode());
        //UI
        this.$refs.myChildTitle.inputValue = "";
        this.$refs.myChildFrequency.inputValue = "";
        this.$refs.myChildDate.inputValue = "";
        this.$refs.myChildTip.inputValue = "";
      }
      this.$test.log("初始化子码参数", this.childCode);
    },
    getChildCode() {
      // 检测表单
      if (this.$refs.myChildTitle.inputVerify()) return false;
      if (this.$refs.myChildFrequency.inputVerify()) return false;
      if (this.$refs.myChildDate.inputVerify()) return false;
      if (this.childCode.childsImagesFiles.length === 0) {
        window.alert("请上传二维码");
        return false;
      }
      if (!this.childCode.childLogoFile) {
        window.alert("请上传头像");
        return false;
      }
      let myChildCode = this.childCode; // 注意：H5取得的 File 对象引用不能丢失（如克隆拷贝）
      myChildCode.childTitle = this.$refs.myChildTitle.inputValue;
      myChildCode.childFrequency = this.$refs.myChildFrequency.inputValue;
      myChildCode.childDate = this.$refs.myChildDate.inputValue;
      myChildCode.childTip = this.$refs.myChildTip.inputValue;
      this.$test.log("取得子码参数", myChildCode);
      return myChildCode;
    },
    // 获取本地多个子码图片
    setChildsImages() {
      this.selectLocalImage(true, () => {
        // 回调
        this.childCode.childsImagesFiles = [];
        this.childCode.childsImagesLocal = [];
        event.target.files.forEach(item => {
          this.childCode.childsImagesFiles.push(item);
          this.childCode.childsImagesLocal.push(
            window.URL.createObjectURL(item)
          );
        });
        this.$test.log(
          "取得本地多个子码图片",
          this.childCode.childsImagesFiles
        );
      });
    },
    // 获取本地Logo图片
    setChildLogo() {
      this.selectLocalImage(false, () => {
        // 回调
        let image = event.target.files[0];
        this.childCode.childLogoFile = image;
        this.childCode.childLogoLocal = window.URL.createObjectURL(image);
        this.$test.log("取得本地Logo图片", this.childCode.childLogoFile);
      });
    },
    // 通用 - 获取本地子码图片列表
    selectLocalImage(isMultiple, callback) {
      let tag = document.createElement("input");
      tag.type = "file";
      tag.accept = "image/*";
      tag.ref = "file";
      tag.style.display = "none";
      tag.multiple = isMultiple;
      tag.addEventListener("change", callback);
      tag.click();
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
