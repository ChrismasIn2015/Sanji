<template>
  <div class="sj-calendar">
    <input
      v-model="inputValue"
      @click.self="setCalendarBoard"
      readonly="readonly"
      :class="{ 'warn-input': inputWarn }"
      :placeholder="state.holder"
    />
    <div class="input-warn" v-show="inputWarn">{{ inputWarn }}</div>
    <!-- 日历面板 -->
    <div v-show="calendarBoardShow" class="calendar-board">
      <div class="board-title flex-side">
        <span>日期</span>
        <span @click.stop="calendarBoardShow = false" style="cursor: pointer;"
          >✖</span
        >
      </div>
      <div class="board-content">
        <div v-for="(days, month, index) in calendarDate" :key="index">
          <div class="month">{{ month }}月</div>
          <div
            class="day"
            v-for="(day, _index) in days"
            :key="_index"
            @click.self="getCalendarDate(month, _index)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getYYMMDD, getMM, getDD } from '@/utils/utils.js'
  export default {
    props: {
      state: {
        type: Object,
        default: () => {
          return {
            holder: '',
            type: '',
          }
        },
      },
    },
    data() {
      return {
        // 表单值
        inputValue: '',
        inputWarn: '',
        // 日历值
        calendarBoardShow: false,
        calendarDate: {}, // 03: ["15", "16"...]
      }
    },
    mounted() {
      this.setDefaultDate()
      document.addEventListener('click', () => {
        if (!event.target.offsetParent) return
        if (!event.target.offsetParent.className.includes('sj-calendar')) {
          this.calendarBoardShow = false
        }
      })
    },
    methods: {
      // 展示日历面板
      setCalendarBoard() {
        if (this.state.type === 'gap') {
          this.initCalendarHistory(180)
        }
        if (!this.state.type) {
          this.initCalendarDate(30)
        }
        this.calendarBoardShow = true
      },
      // 点击某个日期 设置输入框的值
      getCalendarDate(key, index) {
        this.inputWarn = ''
        this.calendarBoardShow = false
        let date = this.calendarDate[key][index]
        this.inputValue = key + '-' + date
      },
      setDefaultDate() {
        // 设置默认值
        let later = new Date().getTime()
        this.inputValue = getYYMMDD(later + 86400000 * 7)
      },
      initCalendarHistory(gap) {
        // 初始化数据
        let now = new Date().getTime()
        this.calendarDate = {}
        for (let i = gap; i >= 0; i--) {
          let month = getMM(now - 86400000 * i)
          month = new Date(now - 86400000 * i).getFullYear() + '-' + month
          let day = getDD(now - 86400000 * i)
          if (!this.calendarDate[month]) {
            this.calendarDate[month] = []
          }
          this.calendarDate[month].push(day)
        }
      },
      initCalendarDate(gap) {
        // 初始化数据
        let now = new Date().getTime()
        this.calendarDate = {}
        for (let i = 1; i <= gap; i++) {
          let month = getMM(now + 86400000 * i)
          month = new Date(now + 86400000 * i).getFullYear() + '-' + month
          let day = getDD(now + 86400000 * i)
          if (!this.calendarDate[month]) {
            this.calendarDate[month] = []
          }
          this.calendarDate[month].push(day)
        }
      },
      inputVerify() {
        // 验证日期
        if (this.inputValue.length === 0) {
          return (this.inputWarn = '请选择日期')
        }
        // # 外部验证需要返回值
        return this.inputWarn
      },
    },
  }
</script>

<style lang="scss">
  .sj-calendar {
    position: relative;
    input {
      cursor: pointer;
      border: 1px solid $common-tip-lower;
      height: 3.125rem;
      line-height: 3.125rem;
      vertical-align: middle;
      transition: all 0.5s;
      padding: 0rem 0.5rem;
      vertical-align: text-top;
      width: 100%;
      &:focus {
        // border: 1px solid $common-main;
        // box-shadow: 0px 0px 2px 0px $common-main;
        outline: 0rem;
      }
      resize: none; // for textarea
    }
    .input-warn {
      position: absolute;
      color: red;
    }
    .warn-input {
      border: 1px solid red;
      box-shadow: 0px 0px 2px 0px red;
    }
    // 日历
    .calendar-board {
      border-radius: 0.2rem;
      z-index: 999;
      position: absolute;
      top: 3.2rem;
      left: 0rem;
      width: 17rem;
      max-height: 14rem;
      background-color: $common-white;
      border: 1px solid $common-main;
      cursor: default;
      .board-title {
        background-color: $common-main;
        padding: 0.5rem;
        color: $common-white;
      }
      .board-content {
        max-height: 11rem;
        padding-left: 0.5rem;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .month {
          color: $common-tip;
          margin: 0.5rem 0rem;
          padding: 0rem 0.2rem;
        }
        .day {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          margin-right: 0.3rem;
          text-align: center;
          font-size: 1.2rem;
          color: $common-main;
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
