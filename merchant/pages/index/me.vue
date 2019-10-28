<template>
  <view id="me">
    <button class="public-primary" @click="toLogin">退出登录</button>
  </view>
</template>

<script>
export default {
  methods: {
    toLogin () {
      uni.reLaunch({
        url: '../main/login'
      });
    }
  }
}
</script>

<style lang="less" scoped>

</style>