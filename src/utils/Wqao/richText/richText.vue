<template>
  <div class="rich">
    <div class="rich-nav flex">
      <div class="nav-item" @click.stop="selectBlod">B</div>
    </div>
    <div id="richText" contenteditable="true" v-html="content" @keydown="keyListen"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: String, default: "auto" },
    height: { type: String, default: "auto" },
    content: { type: String, default: "" }
  },
  data() {
    return {};
  },
  methods: {
    selectBlod() {
      document.execCommand("Bold");
    },
    getContent() {
      let target = document.getElementById("richText");
      let content = target.innerHTML;
      return content;
    },
    keyListen() {
      // 1.监听tab
      if (event.keyCode === 9) {
        document.execCommand("insertText", false, "    ");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rich {
  background-color: $common-tip-lower;
  padding: 0.5rem;
  margin-top: 0.5rem;
  .rich-nav {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $common-tip;
    .nav-item {
      margin-right: 0.2rem;
      text-align: center;
      cursor: pointer;
      line-height: 2rem;
      width: 2rem;
      height: 2rem;
      background-color: $common-tip;
      &:hover {
        background-color: $common-white;
      }
    }
  }
  #richText {
    padding: 0.5rem 0rem;
    &:focus {
      outline: 0rem;
    }
  }
}
</style>
