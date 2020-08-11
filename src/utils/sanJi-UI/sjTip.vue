<template>
  <div class="sjTip top-scroll-off" :class="{ 'top-scroll-on': messageShow }">{{ localMessage }}</div>
</template>

<script>
export default {
  data() {
    return {
      localMessage: "",
      messageShow: false,
      messageTimer: null,
    };
  },
  methods: {
    toShow(message) {
      if (this.messageTimer) return;
      this.localMessage = message;
      this.messageShow = true;
      this.messageTimer = setTimeout(() => {
        this.messageShow = false;
        clearTimeout(this.messageTimer);
        this.messageTimer = null;
      }, 1200);
    },
  },
};
</script>

<style lang="scss" scoped>
  .sjTip {
    position: fixed;
    top: 0rem;
    left: 50%;
    // transform: translateX(-50%);
    color: $sj-main;
    // border: 1px solid $sj-main;
    background-color: rgb(211, 233, 176);
    padding: 0.5rem 1rem;
    max-width: 20%;
    border-radius: 0.3rem;
    word-break: break-word;
  }
</style>
