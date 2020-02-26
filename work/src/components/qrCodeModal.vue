<template>
  <div class="modal" v-show="modalShow">
  </div>
</template>

<script>
export default {
  props: {
    modalShow: {
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
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $common-tip;
  z-index: 998;
}
</style>
