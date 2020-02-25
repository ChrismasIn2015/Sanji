<template>
  <div class="index-card">
    <div class="indexTools flex">
      <div class="tool " v-for="(tool, index) in toolList" :key="index">
        <div class="tool-card flex">
          <img :src="tool.icon" alt="" />
          <div class="tool-line">
            <div class="tool-line-title">{{tool.name}}</div>
            <div class="tool-line-tip">{{tool.tip}}</div>
          </div>
        </div>
        <div class="tool-btns flex">
          <div class="btn flex-middle" v-for="(button, _index) in tool.buttons" :key="_index">{{ button.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolList: [
        {
          name: "活码工具",
          tip:
            "自动生成多个群聊/客服二维码，破除微信群二维码200人上限、七天后失效等限制。",
          icon: require("../../static/images/logo-green.png"),
          buttons: [{ name: "活码管理" }, { name: "创建活码" }]
        },
        {
          name: "二维码工具",
          tip: "二维码生成器说明二维码生成器说明二维码生成器说明二维码生成器。",
          icon: require("../../static/images/logo-green.png"),
          buttons: [{ name: "二维码管理" }, { name: "生成二维码" }]
        }
      ]
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.indexTools {
  padding: 2.5rem;
  .tool {
    width: 38rem;
    margin-right: 2.5rem;
    border-radius: 0.2rem;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px #eeeeee;
    .tool-card {
      padding: 2.56rem;
      img {
        width: 5.7rem;
        height: 5.7rem;
        margin-right: 1.375rem;
      }
      .tool-line {
        cursor: default;
        .tool-line-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: $common-tip-higher;
        }
        .tool-line-tip {
          color: $common-tip;
          font-size: 1rem;
          line-height: 1.6rem;
        }
      }
    }
    .tool-btns {
      .btn {
        width: 50%;
        padding: 1rem 0rem;
        border-top: 1px solid $common-back;
        border-right: 1px solid $common-back;
        cursor: pointer;
        color: $common-tip-higher;
        &:hover {
          background-color: $common-back;
        }
      }
    }
  }
}
// 通用
.index-card {
  background-color: $common-white;
  height: 100%;
  border: 1rem solid $common-back;
}
</style>
