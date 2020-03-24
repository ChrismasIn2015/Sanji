<template>
  <div class="common-input">
    <!-- 1.none 普通输入框 -->
    <input v-model="inputValue" @focus.stop="inputWarn = ''" :class="{'warn-input': inputWarn}" :style="{'padding-left': state.icon ? '2rem' : '1rem' }" :placeholder="state.holder" :type="state.type" v-show="tagSwitch === 'input'" maxlength="24" />
    <textarea v-model="inputValue" @focus.stop="inputWarn = ''" :class="{'warn-input': inputWarn}" :placeholder="state.holder" :type="state.type" v-show="tagSwitch === 'textarea'" maxlength="50" />
    <div class="input-warn" v-show="inputWarn">{{ inputWarn }}</div>
    <img v-show="state.icon" class="input-icon" :src="state.icon" alt="">
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
          icon: ""
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

      // 验证密码
      if (this.state.type === "password") {
        if (this.inputValue.length < 6 || /^\d+$/.test(this.inputValue)) {
          this.inputWarn = "请输入至少6位数字+字母";
        }
      }

      // 验证手机号
      if (this.state.rule === "phone") {
        if (!/^1[3456789]\d{9}$/.test(this.inputValue)) {
          this.inputWarn = "请输入11位手机号";
        }
      }

      // 验证日期
      if (this.state.rule === "date") {
        if (this.inputValue.length !== 10) {
          return (this.inputWarn = "格式 YYYY-MM-DD");
        }
        // 七天之内
        let date = new Date(this.inputValue).getTime();
        let today = new Date().getTime();
        let gap = date - today;
        if (!isNaN(date) && gap < 86400000 * 7 && gap > 0) {
          // console.log("七天之内");
        } else {
          return (this.inputWarn = "请输入七天内日期");
        }
      }

      // 验证频率
      if (this.state.rule === "tempNumber") {
        if (this.inputValue > 180 && this.inputValue <= 500) {
          this.inputWarn = "频率过高";
          return "";
        }
        if (this.inputValue > 500) this.inputWarn = "频率最大为500";
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
    border: 1px solid $common-tip-lower;
    transition: all 0.2s;
    padding: 0rem 1rem;
    width: 100%;
    // line-height: 1.5rem;
    height: 3.125rem;
    &:focus {
      border: 1px solid $common-main;
      box-shadow: 0px 0px 1px 0px $common-main;
      outline: 0rem;
    }
    &:hover {
      border: 1px solid $common-main;
      box-shadow: 0px 0px 1px 0px $common-main;
    }
  }
  textarea {
    height: 6.125rem;
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

  //
  .input-icon {
    position: absolute;
    top: 1.2rem;
    left: 0.8rem;
    width: 1rem;
    height: 1rem;
  }

  // 额外：设置 placeholder
  ::-webkit-input-placeholder {
    color: #b2b2b2;
  } /* 使用webkit内核的浏览器 */
  :-moz-placeholder {
    color: #b2b2b2;
  } /* Firefox版本4-18 */
  ::-moz-placeholder {
    color: #b2b2b2;
  } /* Firefox版本19+ */
  :-ms-input-placeholder {
    color: #b2b2b2;
  } /* IE浏览器 */
}

@media (max-width: 500px) {
  .common-input {
    height: 3rem;
    input,
    textarea {
      padding: 0rem 0.5rem;
      font-size: 1rem;
    }
    .input-warn {
      font-size: 1rem;
    }

    // 额外：设置 placeholder
    ::-webkit-input-placeholder {
      color: #b2b2b2;
      font-size: 1rem;
    } /* 使用webkit内核的浏览器 */
    :-moz-placeholder {
      color: #b2b2b2;
      font-size: 1rem;
    } /* Firefox版本4-18 */
    ::-moz-placeholder {
      color: #b2b2b2;
      font-size: 1rem;
    } /* Firefox版本19+ */
    :-ms-input-placeholder {
      color: #b2b2b2;
      font-size: 1rem;
    } /* IE浏览器 */
  }
}
</style>
