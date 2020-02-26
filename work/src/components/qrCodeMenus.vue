<template>
  <div class="menu-list common-shadow" :style="{top:state.top +'px', left:state.left +'px'}" v-show="state.show">
    <div class="menu text-cut" v-for="(menu, index) in menuList" :key="index" @click.stop="toEmit(menu, state.pointer)">{{ menu.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      default: () => {
        return {
          top: 0,
          left: 0,
          pointer: null,
          show: false
        };
      }
    },
    menuList: {
      type: Array,
      default: () => {
        return []; // { name, actionName }
      }
    }
  },
  data() {
    return {};
  },

  methods: {
    toEmit(menu, pointer) {
      this.$emit(menu.actionName, pointer);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-list {
  position: absolute;
  background-color: $common-white;
  .menu {
    width: 6rem;
    padding: 0.5rem;
    color: $common-tip-higher;
    &:hover {
      cursor: pointer;
      background-color: $common-tip-lower;
    }
  }
}
</style>
