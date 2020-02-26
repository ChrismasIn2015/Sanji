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
      v-show="tagSwitch === 'input'"
      maxlength="24"
    />
    <textarea
      v-model="inputValue"
      @focus.stop="inputWarn = ''"
      @blur.stop="inputVerify"
      :class="{'warn-input': inputWarn}"
      :placeholder="state.holder"
      :type="state.type"
      v-show="tagSwitch === 'textarea'"
    />
    <div class="input-warn" v-show="inputWarn">{{ inputWarn }}</div>
    <!-- 2.btn 普通输入框+右侧按钮 -->
    <div
      class="input-btn"
      v-if="state.plus === 'btn'"
      @click.stop="setCountTimer"
    >{{ count === 60 ? "发送验证码": count}}</div>
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
          plus: "", // btn 短信验证码
          value: "", // 编辑值
          rule: "" // 自定义规则
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
      // 验证手机号
      if (this.state.rule === "phone") {
        if (this.inputValue.length !== 11 || !/^\d+$/.test(this.inputValue)) {
          this.inputWarn = "请输入11位手机号";
        }
      }
      // 验证密码
      if (this.state.type === "password") {
        if (this.inputValue.length < 6 || /^\d+$/.test(this.inputValue)) {
          this.inputWarn = "请输入至少6位数字+字母";
        }
      }
      // # 外部验证需要返回值
      return this.inputWarn;
    },
    emptyCheck() {
      if (this.inputValue.indexOf(" ") !== -1 || this.inputValue.length === 0) {
        this.inputWarn = "不允许为空";
        return true;
      }
      return false;
    },
    setCountTimer() {
      if (this.countTimer) return;
      this.count = 59;
      this.countTimer = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          clearInterval(this.countTimer);
          this.count = 60;
          this.countTimer = null;
        }
      }, 1000);
      this.$test.log("发送验证码成功", this.countTimer);
    }
  }
};
</script>

<style lang="scss">
.common-input {
  position: relative;
  input,
  textarea {
    border: 1px solid $common-tip-lower;
    transition: all 0.2s;
    padding: 0.5rem;
    width: 100%;
    font-size: 0.9rem;
    &:focus {
      border: 1px solid $common-main;
      box-shadow: 0px 0px 2px 0px $common-main;
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
    color: $common-tip-higher;
    font-size: 0.9rem;
  } /* 使用webkit内核的浏览器 */
  :-moz-placeholder {
    color: $common-tip-higher;
    font-size: 0.9rem;
  } /* Firefox版本4-18 */
  ::-moz-placeholder {
    color: $common-tip-higher;
    font-size: 0.9rem;
  } /* Firefox版本19+ */
  :-ms-input-placeholder {
    color: $common-tip-higher;
    font-size: 0.9rem;
  } /* IE浏览器 */
}
</style>
