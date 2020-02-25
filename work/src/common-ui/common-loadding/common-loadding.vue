<template>
  <div class="common-blank" v-show="loadding">
  </div>
</template>

<script>
export default {
  props: {
    loadding: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.common-blank {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $common-tip;
  z-index: 999;
}
</style>
