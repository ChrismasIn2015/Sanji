<template>
  <div class="common-input">
    <!-- 1.none 普通输入框 -->
    <input
      v-model="inputValue"
      @focus.stop="inputWarn = ''"
      @blur.stop="inputVerify"
      :class="{'warn-input': inputWarn}"
      :placeholder="state.holder"
      :type="state.type"
      :disabled="state.disable"
      v-show="tagSwitch === 'input'"
      maxlength="24"
    />
    <div class="input-warn" v-show="inputWarn">{{ inputWarn }}</div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      default: () => {
        return {
          type: "none",
          holder: "",
          value: "", // 编辑值
          rule: "", // 自定义规则
          disable: false
        };
      }
    }
  },
  data() {
    return {
      // 表单值
      inputValue: this.state.value ? this.state.value : "",
      inputWarn: "",
      // 验证码
      countTimer: null,
      count: 60
    };
  },
  computed: {
    tagSwitch() {
      switch (this.state.type) {
        case "textarea":
          return "textarea";
        default:
          return "input";
      }
    }
  },
  methods: {
    inputVerify() {
      // 不允许为空
      if (this.emptyCheck()) return this.inputWarn;

      // 数字至少为1
      if (this.state.type === "number") {
        this.inputValue = Number.parseInt(this.inputValue);
        if (this.inputValue < 1) {
          this.inputWarn = "请输入大于 0 的数字";
          return this.inputWarn;
        }
      }

      // # 外部验证需要返回值
      return this.inputWarn;
    },
    emptyCheck() {
      if (this.state.rule === "empty") return false; // 允许为空
      String(this.inputValue).replace(/ /g, "");
      if (this.inputValue.length === 0) {
        this.inputWarn = "不允许为空";
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
.common-input {
  position: relative;
  input,
  textarea {
    border: 1px solid #eeeeee;
    transition: all 0.2s;
    padding: 0.5rem;
    width: 100%;
    font-size: 0.9rem;
    &:focus {
      // border: 1px solid $common-main;
      // box-shadow: 0px 0px 2px 0px $common-main;
      outline: 0rem;
    }
    resize: none; // for textarea
  }
  .input-warn {
    position: absolute;
    font-size: 0.9rem;
    color: red;
  }
  .warn-input {
    border: 1px solid red;
    box-shadow: 0px 0px 2px 0px red;
  }
  .input-btn {
    position: absolute;
    width: 7rem;
    height: 2.2rem;
    line-height: 2rem;
    text-align: center;
    background-color: $common-white;
    top: 0rem;
    right: 0rem;
    cursor: pointer;
    border: 1px solid $common-tip;
    &:hover {
      background-color: $common-tip-lower;
    }
    &:active {
      background-color: $common-tip;
    }
  }

  // 额外：设置 placeholder
  ::-webkit-input-placeholder {
    color: #b2b2b2;
    font-size: 0.9rem;
  } /* 使用webkit内核的浏览器 */
  :-moz-placeholder {
    color: #b2b2b2;
    font-size: 0.9rem;
  } /* Firefox版本4-18 */
  ::-moz-placeholder {
    color: #b2b2b2;
    font-size: 0.9rem;
  } /* Firefox版本19+ */
  :-ms-input-placeholder {
    color: #b2b2b2;
    font-size: 0.9rem;
  } /* IE浏览器 */
}
</style>
