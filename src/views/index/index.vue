<template>
  <div class="index">
    <!-- 每日标记 -->
    <div v-for="(schedule, index) in mySchedule" :key="index">
      <planBoard :schedule="schedule" />
    </div>

    <!-- 右侧导航 -->
    <indexEntry />
  </div>
</template>

<script>
import indexEntry from "@/components/indexEntry/indexEntry.vue";
import planBoard from "./components/planBoard.vue";
import mySchedule from "./components/mySchedule.js";
export default {
  data() {
    return {
      mySchedule: {},
    };
  },
  mounted() {
    //
    this.mySchedule = Object.assign({}, mySchedule);
  },
  components: {
    planBoard,
    indexEntry,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.index {
  padding: 0.5rem;
  .index-time {
    margin-bottom: 0.5rem;
    display: inline-block;
    font-size: 1.5rem;
  }
}
</style>
