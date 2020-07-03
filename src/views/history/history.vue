<template>
  <div class="history-line flex-y">
    <!-- 导航 -->
    <div class="line-nav flex">
      <div class="common-btn blue-on" @click.stop="renderCalendar">当年日期</div>
    </div>
    <!-- 内容 -->
    <div class="line-content">
      <!-- 年 -->
      <div v-for="(yearEntry, yearIndex) in calendarMap" :key="yearIndex">
        <h1>{{ yearEntry[0] }}</h1>
        <!-- 月份 -->
        <div class="flex-wrap">
          <div
            style="width: 27rem;"
            v-for="(monthEntry, monthIndex) in yearEntry[1]"
            :key="monthIndex"
          >
            <h2>{{ monthEntry[0] }}</h2>
            <!-- 日期 -->
            <div class="flex-wrap">
              <div
                class="common-btn orange-on"
                v-for="(date, index) in monthEntry[1]"
                :key="index"
                :class="{ orange: date.past }"
              >{{ date.day }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧导航 -->
    <indexEntry />
  </div>
</template>

<script>
import indexEntry from "@/components/indexEntry/indexEntry.vue";
import { getCalendarMatrix } from "@/utils/utils.js";
export default {
  data() {
    return {
      calendarMap: new Map()
    };
  },
  mounted() {
    this.renderCalendar();
  },
  components: {
    indexEntry
  },
  methods: {
    renderCalendar() {
      let map = getCalendarMatrix(
        Date.parse("2020-06-01"),
        Date.parse("2020-12-20")
      );
      this.calendarMap = map;
    },
    toIndex() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/history.scss";
</style>
