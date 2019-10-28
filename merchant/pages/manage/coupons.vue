<template>
  <view class="page">
    <view class="uni-list">
      <block v-for="(listItem,index) in tableList" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">{{ listItem.couponName }}</text>
              <text class="uni-text">发布数量：{{listItem.num}}</text>
              <text class="uni-text-small uni-ellipsis" v-if="listItem.isPutaway">
                <text v-if="listItem.isPutaway === 1">上架中</text>
                <text v-if="listItem.isPutaway === 2">已下架</text>
              </text>
            </view>
            <view class="uni-triplex-right">
              <text class="uni-h5">{{ listItem.date }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        { ActivityId: '1', couponName: '中秋促销', num: 200, isPutaway: 1, date: '2019/10/25' },
        { ActivityId: '2', couponName: '周末打折', num: 32, isPutaway: 1, date: '2019/10/26' }
      ],
    }
  }
}
</script>

<style>
</style>
