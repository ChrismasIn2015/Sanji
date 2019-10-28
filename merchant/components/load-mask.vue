<template>
  <view class='load-mask'>
    <view class="load-container">
      <view class='load p1'/>
      <view class='load p2'/>
      <view class='load p3'/>
      <view class='load p4'/>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.load-mask{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0upx;
  left: 0upx;
  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  .load-container{
    position: relative;
    .load{
      position: absolute;
      transform: translate(-50%, -50%)
    }
    .p1{
      border: 50upx solid transparent;
      border-top-color: rgb(97,203,211);
      animation: p1 1s infinite;
    }
    .p2{
      border: 50upx solid transparent;
      border-right-color: rgb(97,203,211);
      animation: p2 1s infinite;
    }
    .p3{
      border: 50upx solid transparent;
      border-bottom-color: rgb(97,203,211);
      animation: p3 1s infinite;
    }
    .p4{
      border: 50upx solid transparent;
      border-left-color: rgb(97,203,211);
      animation: p4 1s infinite;
    }
    @keyframes p1 { 0% { top: 0upx } 50% { top: -50upx } 100% { top: 0upx } }
    @keyframes p2 { 0% { left: 0upx } 50% { left: 50upx } 100% { left: 0upx } }
    @keyframes p3 { 0% { top: 0upx } 50% { top: 50upx } 100% { top: 0upx } }
    @keyframes p4 { 0% { left: 0upx } 50% { left: -50upx } 100% { left: 0upx } }
  }
}
</style>