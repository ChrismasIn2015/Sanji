<template>
  <div v-show="pageShow">
    <div class="create">
      <!-- 流程条 -->
      <div class="create-process flex-middle-x">
        <div
          class="process flex-middle-y"
          v-for="(process, index) in processList"
          :key="index"
          :class="{'process-active': processIndex-1 === index, 'process-actived': processIndex-1 > index}"
        >
          <div class="process-index">{{ processIndex-1 > index ? "√" : index}}</div>
          <div class="process-name">{{ process.name }}</div>
          <div class="process-line" v-show="index < processList.length-1"></div>
        </div>
      </div>

      <!-- 步骤1 用法提示 -->
      <div v-show="processIndex === 1">
        <!-- 介绍卡片 -->
        <div class="create-card" v-for="(card, index) in introductionList" :key="index">
          <div class="create-card-block title">
            <div class="card-line">{{ card.title }}</div>
          </div>
          <div class="create-card-block">
            <div
              class="card-line"
              v-for="(introduction, _index) in card.introductions"
              :key="_index"
            >{{ introduction }}</div>
          </div>
        </div>
        <!-- 温馨提示 -->
        <div class="create-tip">
          <img src="../../static/images/logo-green.png" alt class="tip-image" />
          <div class="tip-line title">温馨提示</div>
          <div
            class="tip-line"
          >禁止发布任何违法、违规内容（含微信诱导分享/关注/集赞、红包等），如因内容违规导致域名被封，系统将不会再重新分配域名。且情节严重者将封停账号。</div>
        </div>
        <!-- 外部链接 -->
        <div class="create-link">
          <span>附：</span>
          <div class="common-link">微信外部链接内容管理规范</div>
        </div>
      </div>

      <!-- 步骤2 编辑活码 -->
      <adminCodeEdit ref="adminEdit" v-show="processIndex === 2" />

      <!-- 步骤3 编辑子码 -->
      <childCodeEdit ref="childEdit" v-show="processIndex === 3" />

      <!-- 步骤4 展示子码 -->
      <div v-show="processIndex === 4">
        <div class="qrCode-table">
          <!-- 表格功能区 -->
          <div class="table-nav flex-middle-y">
            <!-- <div class="common-btn">+ 添加群聊码</div> -->
            <div
              class="nav-switch flex-middle-y"
              @click.stop="adminCode.adminShowType = (adminCode.adminShowType === 0 ? 1 : 0)"
            >
              <div class="switch-name">轮播模式</div>
              <div class="switch-btn" :class="{'switch-btn-on': adminCode.adminShowType === 1}">
                <span class="btn"></span>
              </div>
            </div>
            <div style="margin-left: auto">
              <!-- <div class="common-btn-toggle">有效期</div> -->
              <!-- <div class="common-btn-toggle">自动切换频率</div> -->
              <!-- <div class="common-btn-toggle">删除</div> -->
            </div>
          </div>
          <!-- 表格内容 -->
          <div class="table-list">
            <!-- Row 1 -->
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
            <!-- Row N -->
            <div
              class="table-row flex-side"
              v-for="(code, index) in childCodeList"
              :key="index"
              @click.stop="code.checked = !code.checked"
            >
              <div class="table-column flex-middle" style="width: 3%;">
                <div class="column-checkBox" :class="{'column-checkBox-on': code.checked}"></div>
              </div>
              <div class="table-column flex-middle-y">{{ code.imageName }}</div>
              <div class="table-column flex-middle-y">
                <img class="main-image" :src="code.imageLocal" alt />
              </div>
              <div class="table-column flex-middle-y">{{ code.frequency }}</div>
              <div class="table-column flex-middle-y">{{ code.invalidDate }}</div>
              <div
                class="table-column flex-middle-y"
              >{{ adminShowTypeMap[adminCode.adminShowType] }}</div>
              <div class="table-column flex-middle-y">
                <img
                  class="sort-image"
                  src="../../static/images/sort-down.png"
                  alt
                  @click.stop="sortQrCodeList(index, true)"
                />
                <img
                  class="sort-image"
                  src="../../static/images/sort-up.png"
                  alt
                  @click.stop="sortQrCodeList(index, false)"
                />
                <!-- <img class="sort-image" src="../../static/images/sort-top.png" alt="" @click.stop="sortQrCodeList(index)">
                <img class="sort-image" src="../../static/images/sort-bottom.png" alt="" @click.stop="sortQrCodeList(index)">-->
              </div>
              <div class="table-column flex-middle-y">
                <div class="common-link" @click.stop="setChildCodeEdit(code, index)">编辑</div>
                <div class="common-link" @click.stop="deleteChildCodeList(index)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 -->
      <div v-show="processIndex === 5">
        <div class="create-result flex-middle flex-y">
          <img src="../../static/images/logo-green.png" alt />
          <div class="result-message">成功生成活码</div>
          <img :src="myAdminCode.adminImage" alt class="result-image" />
          <div class="result-link">
            永久链接：{{ myAdminCode.adminImage }}
            <span class="common-link">点击下载二维码</span>
          </div>
        </div>
        <div style="height: 9rem;"></div>
      </div>
    </div>

    <!-- 下方步骤按钮 -->
    <div class="create-admin flex-x-reverse">
      <div class="common-btn" v-show="processIndex === 1" @click.stop="setProcess(1)">我已详细阅读，下一步</div>
      <div class="common-btn" v-show="processIndex === 2" @click.stop="setProcess(1)">下一步</div>
      <div class="common-btn" v-show="processIndex === 2" @click.stop="setProcess(0)">上一步</div>
      <div class="common-btn" v-show="processIndex === 3" @click.stop="setProcess(1)">下一步</div>
      <div class="common-btn" v-show="processIndex === 3" @click.stop="setProcess(0)">上一步</div>
      <div class="common-btn" v-show="processIndex === 4" @click.stop="setProcess(1)">创建</div>
      <div class="common-btn" v-show="processIndex === 4" @click.stop="setProcess(0)">上一步</div>
      <div class="common-btn" v-show="processIndex === 5" @click.stop="toIndex">完成</div>
      <div class="common-btn-toggle" v-show="processIndex === 5" @click.stop="processIndex = 1">再次创建</div>
    </div>

    <!-- Loadding -->
    <!-- <qrCodeModal v-show="loadding" @action="showModal" /> -->
    <!-- 编辑子码列表 -->
    <div class="common-modal" v-show="childCodeEditShow">
      <div class="common-modal-blank">
        <childCodeEdit ref="childCodeEdit" />
      </div>
    </div>
  </div>
</template>

<script>
import adminCodeEdit from "@/views/qrCode/components/adminCodeEdit.vue";
import childCodeEdit from "@/views/qrCode/components/childCodeEdit.vue";
// import qrCodeModal from "@/components/qrCodeModal.vue";
import { editAdminCode, editChildCode } from "@/utils/http/api-qrCode";
import { postImage } from "@/utils/http/api-qrCode";

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
      processIndex: 1,
      processList: [
        {
          name: "使用须知",
          complete: false
        },
        {
          name: "创建活码",
          complete: false
        },
        {
          name: "添加二维码",
          complete: false
        },
        {
          name: "二维码管理",
          complete: false
        },
        {
          name: "生成活码",
          complete: false,
          noLine: true
        }
      ],
      loadding: false,
      // 步骤1 介绍规则
      introductionList: [
        {
          title: "活码应用场景",
          introductions: [
            "1. 入群二维码人数限制：单个群扫码进群上限200人，生成活码后可自动切换显示的二维码，同时可把用户分流到多微信群中，极大降低运营人员的压力；",
            "2. 客服微信号长期性：单微信号作为客服，有加好友日数量上限，且有被投诉、封号风险大等问题。使用客服活码后，可设置多个客服号轮流展示，按加好友数来负载均衡，客服号可循环使用和后期处理，实现客服工作的长期自动分配；",
            "3. 线下二维码长期性：微信生成的二维码印刷后，有失效、不可修改等问题。生成活码后不会过期，同时后台可随时编辑且不影响对外的显示二维码，实现有效的长期服务。"
          ]
        },
        {
          title: "活码基本概念",
          introductions: [
            "1. 活动介绍H5页：即从微信内打开的活码工具展示网页，该网页包含活动介绍、引导语、二维码（该码对应的群/个人每加满一定人数后，自动换成其他二维码）。 ",
            "2. 生成活码：将该H5页面链接生成一个不变的二维码，该二维码分享出去，可避免群加满或二维码过期导致的用户流失。该H5链接对应的二维码即称为活码。"
          ]
        },
        {
          title: "注意事项",
          introductions: [
            "群二维码只有7天有效期，请留意“神手软件”服务号通知，及时更换过期的二维码，避免因群二维码过期而无法进群。"
          ]
        }
      ],
      // 步骤2 准备活码参数
      adminCode: {
        adminShowType: 0
      },
      adminShowTypeMap: ["标准", "轮播"],
      // 步骤3 准备子码参数
      childCode: null,
      // 步骤4 准备生成结果
      childCodeList: [],
      childCodeEdit: null,
      childCodeEditIndex: -1,
      childCodeEditShow: false,
      // 步骤5 - 生成成功
      myAdminCode: {}
    };
  },
  watch: {
    pageShow(value) {
      value ? (this.processIndex = 1) : "";
    }
  },
  components: {
    // qrCodeModal,
    adminCodeEdit,
    childCodeEdit
  },
  methods: {
    // 全局
    async createMyAdminCode() {
      try {
        //
        let tempUrl = "";
        let formdata = null;
        // 1.上传所有图片 **************************
        // - 上传 活码Logo
        formdata = new FormData();
        formdata.append(
          "file",
          this.childCode.childLogo.file,
          this.childCode.childLogo.file.name
        );
        tempUrl = await postImage(formdata);
        this.childCode.childLogo.url = tempUrl;
        this.$test.log("上传活码Logo成功", this.childCode.childLogo.url);
        // - 上传 客服微信
        if (this.adminCode.customerServiceFile) {
          formdata = new FormData();
          formdata.append(
            "file",
            this.adminCode.customerServiceFile,
            this.adminCode.customerServiceFile.name
          );
          tempUrl = await postImage(formdata);
          this.adminCode.modes.customerService = tempUrl;
          this.$test.log(
            "上传客服微信成功",
            this.adminCode.modes.customerService
          );
        }
        // - 上传 子码图片
        let tempChildsImages = [];
        let temp = this.childCode.codes;
        for (let index = 0; index < temp.files.length; index++) {
          let item = temp.files[index];
          formdata = new FormData();
          formdata.append("file", item, item.name);
          tempUrl = await postImage(formdata);
          tempChildsImages.push({ imageName: item.name, imageUrl: tempUrl });
        }
        this.$test.log("上传子码图片成功", tempChildsImages);
        // 2.创建活码 **************************
        let newCode = await editAdminCode(
          -1,
          this.adminCode.adminType,
          this.$refs.adminCodeEdit.myAdminName.inputValue,
          this.$refs.adminCodeEdit.myAdminTip.inputValue,
          this.adminCode.modes,
          this.adminCode.adminShowType,
          this.adminCode.invalidDate
        );
        this.$test.log("创建活码成功", newCode);
        this.myAdminCode = newCode;
        // 3.添加子码 **************************
        await editChildCode(
          newCode.id,
          -1,
          0,
          this.childCode.childImageType,
          this.$refs.adminCodeEdit.myAdminName.inputValue,
          tempChildsImages,
          this.childCode.childLogo.url,
          Number(this.childCode.childFrequency),
          this.$refs.adminCodeEdit.myAdminTip.inputValue,
          this.adminCode.invalidDate
        );
        this.$test.log("添加子码成功");
        this.processIndex++;
      } catch (error) {
        window.alert(error);
      }
    },
    setChildCodeEdit(item, index) {
      this.childCode.childImageLocal = item.imageLocal;
      this.childCode.childLogoLocal = item.logoLocal;
      this.childCodeEditIndex = index;
      this.$refs.childCodeEdit.initChildCode(this.childCode);
      this.childCodeEditShow = true;
    },
    // toggleChildEdit(item, index) {
    //   this.childCodeEditShow = !this.childCodeEditShow;
    //   if (this.childCodeEditShow) {
    //     item["editIndex"] = index;
    //     this.childCodeEditTemp = item;
    //     console.log("设置编辑值", this.childCodeEditTemp);
    //   } else {
    //     //
    //   }
    //   this.childCodeList = Object.assign([], this.childCodeList);
    // },
    editLocalImage(image) {
      let target = this.childCodeList[image.index];
      console.log("改变前", target.childImageName);
      if (target) {
        target.childImageFile = image.file;
        target.childImageLocal = image.local;
        target.childImageName = image.file.name;
      }
      console.log("改变后", target.childImageName);
      this.childCodeList = Object.assign([], this.childCodeList);
      this.childCodeEditShow = false;
    },
    deleteChildCodeList(index) {
      this.childCodeList.splice(index, 1);
    },
    sortQrCodeList(index, toPop) {
      let tempList = JSON.parse(JSON.stringify(this.childCodeList));
      let targetIndex = toPop ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= tempList.length) return;
      // 交换
      let temp = tempList[index];
      tempList[index] = tempList[targetIndex];
      tempList[targetIndex] = temp;
      // 渲染
      this.childCodeList = Object.assign([], tempList);
    },
    // 样式
    // * 步骤跳转
    setProcess(bool) {
      if (bool) {
        let index = this.processIndex + 1;

        // 进入活码编辑之前
        if (index === 2) {
          // 1.需要初始化
          this.$refs.adminEdit.initAdminCode();
        }

        // 进入子码编辑之前
        if (index === 3) {
          // 1.需要获取活码数据
          let myAdminCode = this.$refs.adminEdit.getMyAdminCode();
          if (myAdminCode === false) return;
          this.adminCode = myAdminCode;
          this.$test.log("步骤4 活码", this.adminCode);
          // 2.需要初始化子码数据
          this.$refs.childEdit.initChildCode();
        }

        // 进入子码列表之前
        if (index === 4) {
          // 1.需要获取子码数据
          let myChildCode = this.$refs.childEdit.getChildCode();
          if (myChildCode === false) return;
          this.childCode = myChildCode;
          this.$test.log("步骤4 子码", this.childCode);
          // 2.制作子码列表
          this.setChildCodeList();
        }

        this.processIndex++;
      } else {
        this.processIndex--;
      }
    },
    // 根据 childCode 制作对应表格List
    setChildCodeList() {
      let list = [];
      this.childCode.childsImagesLocal.forEach((item, index) => {
        list.push({
          // 列表参数
          checked: false,
          imageName: this.childCode.childsImagesFiles[index].name,
          imageLocal: item,
          logoLocal: this.childCode.childLogoLocal,
          frequency: this.childCode.childFrequency,
          invalidDate: this.childCode.childDate
        });
      });
      this.childCodeList = Object.assign([], list);
      this.$test.log("二维码列表", this.childCodeList);
    },
    toIndex() {
      this.$parent.setBarActive({ 0: 0, 1: -1 });
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  background-color: $common-white;
  padding: 2rem;
  margin: 1.5rem 1.5rem 6rem;
  min-height: 54rem;
  .create-process {
    .process {
      cursor: default;
      color: $common-tip;
      margin-bottom: 2rem;
      .process-index {
        color: $common-tip;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border: 1px solid $common-tip-lower;
        border-radius: 1rem;
      }
      .process-name {
        margin-left: 0.5rem;
      }
      .process-line {
        margin: 0rem 1rem;
        width: 6rem;
        border-top: 1px solid $common-tip-lower;
      }
    }
    // 激活状态
    .process-active {
      .process-index {
        background-color: $common-main;
        border: 1px solid $common-main;
        color: $common-white;
      }
      .process-name {
        color: $common-main;
      }
    }
    // 激活完毕状态
    .process-actived {
      .process-index {
        background-color: $common-white;
        border: 1px solid $common-main;
        color: $common-main;
      }
      .process-name {
        color: $common-tip-higher;
      }
      .process-line {
        border-top: 1px solid $common-main;
      }
    }
  }
  // 1.步骤2
  .create-card {
    cursor: default;
    margin: 0rem 1.3125rem 1.25rem;
    .create-card-block {
      padding: 1rem 2rem;
      border: 1px solid $common-tip-lower;
      color: #666666;
      .card-line {
        line-height: 1.5rem;
        margin-bottom: 0.5rem;
        &:last-child {
          margin-bottom: 0rem;
        }
      }
    }
    .title {
      background-color: #f6f6f6;
      color: #262626;
      border-bottom: none;
      font-size: 1.1rem;
    }
  }
  .create-tip {
    cursor: default;
    margin: 0rem 1rem;
    padding: 1rem;
    position: relative;
    border: 1px solid #ffe58f;
    background-color: #fffbe6;
    .tip-image {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      left: 1rem;
      top: 1rem;
    }
    .tip-line {
      padding-left: 3rem;
      color: #666666;
    }
    .title {
      color: $common-black;
      padding-bottom: 0.4rem;
      font-size: 1.2rem;
    }
  }
  .create-link {
    cursor: default;
    margin: 1rem;
  }
  // 2.步骤3
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
  // 3.步骤4
  // 4.步骤5
  .create-result {
    cursor: default;
    margin-top: 3rem;
    img {
      width: 5rem;
      height: 5rem;
    }
    .result-message {
      font-size: 1.625rem;
      margin: 1rem 0rem;
      color: $common-tip-higher;
    }
    .result-image {
      border: 1px solid $common-tip;
      width: 13.75rem;
      height: 13.75rem;
    }
    .result-link {
      margin: 1rem 0rem;
    }
  }
}
.create-admin {
  width: 100%;
  background-color: $common-white;
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 1rem 2rem;
  .common-btn {
    padding: 0.5rem 2rem;
    margin-left: 1rem;
  }
}
.tempModal {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
