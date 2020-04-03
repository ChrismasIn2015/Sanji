<template>
  <div class="modal fade" :class="{ 'fade-on': modalShow, 'fade-off': !modalShow }">
    <!-- wqao-ui -->
    <div class="common-modal">
      <div class="common-modal-blank" style="max-width: 30rem;">
        <div class="modal-title">
          <span>{{ title }}</span>
          <span @click.stop="postAction(false)">✖</span>
        </div>
        <div class="modal-content">{{ content }}</div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="postAction(true)">确定</div>
          <div class="common-btn tip" @click.stop="postAction(false)">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(value) {
      this.modalShow = value ? true : false;
    }
  },
  data() {
    return {
      modalShow: false,
      cancelShow: true
    };
  },
  methods: {
    postAction(params) {
      this.$emit("action", params);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  .common-modal {
    animation: opacityShow 0.5s;
  }
}
</style>
