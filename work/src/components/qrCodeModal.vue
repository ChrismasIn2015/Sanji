<template>
  <div class="modal flex-middle">
    <!-- @click.self="toggleModal" -->
    <slot name="space"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleModal() {
      this.$emit("action");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
