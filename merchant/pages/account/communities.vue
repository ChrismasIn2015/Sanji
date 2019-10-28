<template>
  <view id="communities">
    <!-- 1. 已入驻小区 class类名均为uni.css中的样式 -->
    <view class="uni-list public-mt20">
      <block v-for="(listItem,index) in communityMsg" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="detali(listItem.GoodsId)">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">{{ listItem.name }}</text>
              <text class="uni-text">入驻时间：{{ listItem.entryTime }}</text>
              <text class="uni-text">截止时间：{{ listItem.abortTime }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 侧边小区管理导航栏 -->
    <view class="public-sidebar">
      <view class="sidebar-item" @click="entryCommunity">申请入驻</view>
      <view class="sidebar-item">申请记录</view>
      <view class="sidebar-item">消费记录</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      communityMsg: [
        {
          name: '小区二号',
          entryTime: '2019/10/16 14:58:22',
          abortTime: '2020/10/16 14:58:22'
        },
        {
          name: '老城故事',
          entryTime: '2019/10/16 14:58:22',
          abortTime: '2020/10/16 14:58:22'
        },
        {
          name: '江辉苑',
          entryTime: '2019/10/16 14:58:22',
          abortTime: '2020/10/16 14:58:22'
        }
      ]
    }
  },
  methods: {
    entryCommunity () { uni.navigateTo({ url: './entryCommunity' }) }
  }
}
</script>

<style lang="less" scoped>
.item-title{
  padding: 6px 3px;
  view {
    font-size: 14px;
  }
  .item-left{
    font-size: 16px;
    color: #5EA7B9;
  }
}
</style>