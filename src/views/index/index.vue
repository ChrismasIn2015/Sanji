<template>
  <div class="index">
    <div class="index-entry">
      <div class="entry common-btn" @click.stop="toLibrary">笔记系统</div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
