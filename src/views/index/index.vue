<template>
  <div class="index">
    <div class="index-entry">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue-on" @click.stop="toHistory">时间</div>
    </div>

    <!-- 每日标记 -->
    <div class="flex-x-reverse">
      <div class="color-block" @click.stop="renderTimeBlock">
        <div class="block" :class="timeBlockColor">{{ timeBlockName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { chargeHHMMRange } from "@/utils/utils.js";
export default {
  data() {
    return {
      timeBlockName: "",
      timeBlockColor: ""
    };
  },
  mounted() {
    this.renderTimeBlock();
  },
  methods: {
    toLibrary() {
      this.$router.push({ name: "library" });
    },
    toHistory() {
      this.$router.push({ name: "history" });
    },
    renderTimeBlock() {
      if (chargeHHMMRange(["06:00", "08:30"])) {
        this.timeBlockName = "Math";
        this.timeBlockColor = "c-red";
        return;
      }
      if (chargeHHMMRange(["09:30", "12:00"])) {
        this.timeBlockName = "CS";
        this.timeBlockColor = "c-yellow";
        return;
      }
      if (chargeHHMMRange(["13:40", "18:00"])) {
        this.timeBlockName = "Work";
        this.timeBlockColor = "c-green";
        return;
      }
      if (chargeHHMMRange(["21:00", "00:00"])) {
        this.timeBlockName = "En";
        this.timeBlockColor = "c-blue";
        return;
      }
      this.timeBlockName = "Empty";
      this.timeBlockColor = "c-white";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
