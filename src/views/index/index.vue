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
  mounted() {
    this.sum(1000, 3, 5); // 23
  },
  methods: {
    sum(limit, ...factor) {
      if (typeof limit !== "number") throw Error("limit has error type");
      let count = 0;
      limit -= 1;
      factor.forEach(num => {
        if (typeof num !== "number") throw Error("factor has error type");
        let bottom = (limit - (limit % num)) / num;
        let layer = parseInt(limit / num);
        let tempCount = ((1 + bottom) * layer) / 2;
        count += tempCount * num;
      });
      console.log(count);
      return count;
    },
    toLibrary() {
      this.$router.push({ name: "library" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
