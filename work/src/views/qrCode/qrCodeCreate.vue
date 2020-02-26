<template>
  <div v-show="pageShow">
    <div class="create">
      <!-- 流程条 -->
      <div class="create-process flex-middle-x">
        <div class="process flex-middle-y" v-for="(process, index) in processList" :key="index" :class="{'process-active': processIndex === index, 'process-actived': processIndex > index}">
          <div class="process-index">{{ processIndex > index ? "√" : index+1}}</div>
          <div class="process-name">{{ process.name}}</div>
          <div class="process-line" v-show="index < processList.length-1"></div>
        </div>
      </div>

      <!-- 0 -->
      <div v-show="processIndex === 0">
        <!-- 介绍卡片 -->
        <div class="create-card" v-for="(card, index) in introductionList" :key="index">
          <div class="create-card-block title">
            <div class="card-line">{{ card.title }}</div>
          </div>
          <div class="create-card-block">
            <div class="card-line" v-for="(introduction, _index) in card.introductions" :key="_index">{{ introduction }}</div>
          </div>
        </div>
        <!-- 温馨提示 -->
        <div class="create-tip">
          <img src="../../static/images/logo-green.png" alt="" class="tip-image">
          <div class="tip-line title">温馨提示</div>
          <div class="tip-line">禁止发布任何违法、违规内容（含微信诱导分享/关注/集赞、红包等），如因内容违规导致域名被封，系统将不会再重新分配域名。且情节严重者将封停账号。</div>
        </div>
        <!-- 外部链接 -->
        <div class="create-link">
          <span>附：</span>
          <div class="common-link">微信外部链接内容管理规范</div>
        </div>
      </div>

      <!-- 1 -->
      <div v-show="processIndex === 1">
        <div class="create-form">
          <div class="form-line flex-middle-y">
            <div class="line-name">活码类型：</div>
            <div class="line-content">
              <div class="common-btn-toggle">群聊码</div>
              <div class="common-btn-toggle">客服码</div>
            </div>
          </div>
          <div class="form-line flex-middle-y">
            <div class="line-name">活码页标题：</div>
            <div class="line-content">
              <commonInput ref="myServeName" :state="{ type:'none', holder:'活码页的页面标题，请输入1～24个字' }" />
            </div>
          </div>
          <div class="form-line flex-middle-y">
            <div class="line-name">活码备注(选填)：</div>
            <div class="line-content">
              <commonInput ref="myServeName" :state="{ type:'none', holder:'为了方便您管理活码，该备注不会对外显示' }" />
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name">活码设置：</div>
            <div class="line-content">
              <div class="con-checkBox-plus">
                <div class="box-pot"></div>
                <div class="box-content">
                  <div class="con-line title">防止重复入群</div>
                  <div class="con-line">用户扫码获得微信群码后，后续扫码仅展示所获二维码（无论活码是否有切换/调整）</div>
                </div>
              </div>
              <div class="con-checkBox-plus">
                <div class="box-pot"></div>
                <div class="box-content">
                  <div class="con-line title">管理员微信</div>
                  <div class="con-line">管理员微信绑定后，扫码不受防重复功能影响，且不对其使用数据统计</div>
                </div>
              </div>
              <div class="con-checkBox-plus">
                <div class="box-pot"></div>
                <div class="box-content">
                  <div class="con-line title">安全验证提示</div>
                  <div class="con-line">在活码页顶部增加安全验证信息，来增加可信度</div>
                </div>
              </div>
              <div class="con-checkBox-plus con-checkBox-on">
                <div class="box-pot"></div>
                <div class="box-content">
                  <div class="con-line title">客服功能</div>
                  <div class="con-line">在活码页底部增加客服联系方式，必要时为用户联系客服提供帮助活码活动结束后，默认展示已设置客服微信</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2 -->
      <div v-show="processIndex === 2">
        <div class="create-form">
          <div class="form-line flex-middle-y">
            <div class="line-name">活码类型：</div>
            <div class="line-content">
              <div class="common-btn-toggle">微信二维码</div>
              <div class="common-btn-toggle">自制海报</div>
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name">二维码展示形式：</div>
            <div class="line-content">
              <div class="con-checkBox">
                <div class="box-pot"></div>
                <div class="box-name">标准模式</div>
              </div>
              <div class="con-checkBox">
                <div class="box-pot"></div>
                <div class="box-name">适配模式</div>
              </div>
              <div class="con-checkBox">
                <div class="box-pot"></div>
                <div class="box-name">裁剪模式</div>
              </div>
            </div>
          </div>
          <div class="form-line flex-middle-y">
            <div class="line-name">客服昵称：</div>
            <div class="line-content">
              <commonInput ref="myServeName" :state="{ type:'none', holder:'请输入客服昵称' }" />
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name" style="padding-top: 0.4rem;">上传二维码图片：</div>
            <div class="line-content">
              <div class="common-btn">+ 上传群聊码</div>
              <div class="con-tip">图片小于2M，可多张上传（每次至多500张）</div>
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name" style="padding-top: 0.4rem;">自定义群聊头像：</div>
            <div class="line-content">
              <div class="common-btn">+ 自定义群头像</div>
              <div class="con-tip">图片小于2M，仅可上传一张</div>
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name" style="padding-top: 0.4rem;">自动切换频率：</div>
            <div class="line-content">
              <commonInput class="con-input" ref="myFrequency" :state="{ type:'number', holder:'请输入切换频率' }" />
              <div class="con-tip">当二维码用户达到该数字时，自动切换下一个二维码，频率建议为150-180</div>
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name" style="padding-top: 0.4rem;">二维码失效日期：</div>
            <div class="line-content">
              <commonInput class="con-input" ref="myDate" :state="{ holder:'请输入切换频率' }" />
              <div class="con-tip">根据微信群码图片的底部日期填写，到期前系统将提醒您及时更换</div>
            </div>
          </div>
          <div class="form-line flex">
            <div class="line-name" style="padding-top: 0.4rem;">引导文字 (选填)：</div>
            <div class="line-content">
              <commonInput ref="myMoreText" :state="{ type:'textarea', holder:'二维码下方的引导文字，可输入文字后查看右侧预览图' }" />
            </div>
          </div>
        </div>
      </div>

      <!-- 3 -->
      <div v-show="processIndex === 3">
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

      <!-- 4 -->
      <div v-show="processIndex ===4">
        <div class="create-result flex-middle flex-y">
          <img src="../../static/images/logo-green.png" alt="">
          <div class="result-message">成功生成活码</div>
          <img src="../../static/images/logo-green.png" alt="" class="result-image">
          <div class="result-link">永久链接：http://???????????????????
            <span class="common-link">点击下载二维码</span>
          </div>
        </div>
        <div style="height: 9rem;"></div>
      </div>
    </div>
    <div class="create-admin flex-x-reverse">
      <div class="common-btn" v-show="processIndex === 0" @click.stop="processIndex++">我已详细阅读，下一步</div>
      <div class="common-btn" v-show="processIndex === 1" @click.stop="processIndex++">下一步</div>
      <div class="common-btn" v-show="processIndex === 1" @click.stop="processIndex--">上一步</div>
      <div class="common-btn" v-show="processIndex === 2" @click.stop="processIndex++">下一步</div>
      <div class="common-btn" v-show="processIndex === 2" @click.stop="processIndex--">上一步</div>
      <div class="common-btn" v-show="processIndex === 3" @click.stop="processIndex++">下一步</div>
      <div class="common-btn" v-show="processIndex === 3" @click.stop="processIndex--">上一步</div>
      <div class="common-btn" v-show="processIndex === 4" @click.stop>完成</div>
      <div class="common-btn-toggle" v-show="processIndex === 4" @click.stop="initProcess">再次创建</div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/common-ui/common-input/common-input";
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
      // 步骤2
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
      // 步骤3
      // 步骤4
      // qrCodeGroup
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
      gainModeMap: ["标准", "循环", "轮播"]
    };
  },
  watch: {
    pageShow(value) {
      value ? console.log("create on show") : "";
    }
  },
  components: {
    commonInput
  },
  methods: {
    initProcess() {
      this.processIndex = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.create {
  background-color: $common-white;
  padding: 2rem;
  margin: 1.5rem 1.5rem 6rem;
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
        }
        .con-checkBox-on {
          .box-pot {
            border: 0.35rem solid $common-main;
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
</style>
