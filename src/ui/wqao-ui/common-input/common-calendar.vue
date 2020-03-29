<template>
  <div class="common-calendar">
    <input v-model="inputValue" @click.self="setCalendarBoard" :class="{'warn-input': inputWarn}" :placeholder="state.holder" />
    <div class="input-warn" v-show="inputWarn">{{ inputWarn }}</div>
    <div v-show="calendarBoardShow" class="calendar-board">
      <div class="board-content" v-for="(days, month, index) in calendarDate" :key="index">
        <div class="month">{{ month }}月</div>
        <div class="day" v-for="(day, _index) in days" :key="_index" @click.self="setCalendarDate(month, _index)">{{ day }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYYMMDD, getMM, getDD } from "@/utils/wqao/wqao-utils";
export default {
  props: {
    state: {
      type: Object,
      default: () => {
        return {
          holder: ""
        };
      }
    }
  },
  data() {
    return {
      // 表单值
      inputValue: "",
      inputWarn: "",
      // 日历值
      calendarBoardShow: false,
      calendarDate: {} // 03: ["15", "16"...]
    };
  },
  methods: {
    setDefaultDate() {
      // 设置默认值
      let later = new Date().getTime();
      this.inputValue = getYYMMDD(later + 86400000 * 7);
    },

    setCalendarBoard() {
      this.calendarBoardShow = true;
      this.initCalendarDate();
    },
    setCalendarDate(key, index) {
      this.calendarBoardShow = false;
      let date = this.calendarDate[key][index];
      this.inputValue = new Date().getFullYear() + "-" + key + "-" + date;
      this.inputWarn = "";
    },
    initCalendarDate() {
      // 初始化数据
      let now = new Date().getTime();
      this.calendarDate = {};
      for (let i = 1; i <= 7; i++) {
        let month = getMM(now + 86400000 * i);
        let day = getDD(now + 86400000 * i);
        if (!this.calendarDate[month]) {
          this.calendarDate[month] = [];
        }
        this.calendarDate[month].push(day);
      }
      this.$test.log("取得日历值", this.calendarDate);
    },
    inputVerify() {
      // 验证日期
      if (this.inputValue.length === 0) {
        return (this.inputWarn = "请选择日期");
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

      // # 外部验证需要返回值
      return this.inputWarn;
    }
  }
};
</script>

<style lang="scss">
.common-calendar {
  position: relative;
  input {
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
  // 日历
  .calendar-board {
    z-index: 999;
    position: absolute;
    top: 0rem;
    left: 0rem;
    width: 14rem;
    // height: 8rem;
    padding: 0.5rem;
    background-color: $common-white;
    // border-radius: 0.4rem;
    border: 1px solid $common-main;
    // overflow: scroll;
    cursor: default;
    .board-content {
      .month {
        color: $common-tip;
        margin: 0.5rem 0rem;
        padding: 0rem 0.2rem;
      }
      .day {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.3rem;
        font-size: 1.2rem;
        color: $common-main;
        padding: 0.2rem;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background-color: $common-main;
          color: $common-white;
        }
      }
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
