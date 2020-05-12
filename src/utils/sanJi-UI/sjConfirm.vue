<template>
  <div class="modal fade-off" :class="{ 'fade-on': modalShow }">
    <!-- wqao-ui -->
    <div class="common-modal">
      <div class="common-modal-blank" style="max-width: 30rem;">
        <div class="modal-title" v-show="title">
          <span>{{ title }}</span>
          <span @click.stop="modalShow = false">✖</span>
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
    data() {
      return {
        title: '',
        content: '',
        modalShow: false,
        nextPointer: null,
      }
    },
    methods: {
      toShow(option, next) {
        this.title = option.title || ''
        this.content = option.content || ''
        this.nextPointer = next
        this.modalShow = true
      },
      postAction(bool) {
        if (this.nextPointer) {
          this.nextPointer(bool)
        }
        this.modalShow = false
      },
    },
  }
</script>

<style lang="scss" scoped></style>
