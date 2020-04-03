<template>
  <div class="index">
    <div class="index-entry">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
      <div class="entry common-btn blue-on">资源地图</div>
      <div class="entry common-btn blue-on" @click.stop="leetCode">Leet Code Test</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLibrary() {
      this.$router.push({ name: "library" });
    },
    leetCode() {}
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
