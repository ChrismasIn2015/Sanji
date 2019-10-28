<template>
  <view class="entry">
    <!-- 1. 获取小区列表 -->
    <view class="entry-list">
      <checkbox-group @change="checkboxChange">
        <!-- 1.1 列表标题 -->
        <view class="entry-list-item entry-header">
          <text>小区名称</text><text>小区地址</text>
        </view>
        <!-- 1.2 列表内容 -->
        <view class="entry-list-item" v-for="item in communities" :key="item.value">
          <checkbox :value="item.title" :checked="item.selected" class="entry-checkbox" />
          <text class="community-title">{{item.title}}</text>
          <text class="community-addres">{{item.address}}</text>
        </view>
      </checkbox-group>
    </view>
    <!-- 2. 底部提交按钮 -->
    <view class="entry-submit">
      <button class="public-primary-mini">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      communities: [
        {
          communityId: 2,
          title: '麦年社区',
          address: '上海市浦东新区海霞路',
          selected: true
        },
        {
          communityId: 4,
          title: '盛泰家园',
          address: '上海市浦东新区晨阳路'
        },
        {
          communityId: 4,
          title: '盛泰家园',
          address: '上海市浦东新区晨阳路'
        },
        {
          communityId: 6,
          title: '天环苑',
          address: '上海市浦东新区江晖路'
        }
      ]
    }
  },
  methods: {
    checkboxChange (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.entry{
  .entry-list{
    background-color: #ffffff;
    margin-top: 10px;
    .entry-header {
      font-size: 18px;
      font-weight: bold;
      padding-left: 12px;
      text { padding-left: 10%; }
    }
    .entry-list-item {
      padding: 10px 12px;
      border-bottom: 1px solid #f7f7f7;
      .entry-checkbox {
        color: #5EA7B9;
        transform:scale(0.7)
      }
      .community-title {  
        padding: 0px 12px;
      }
    }
  }
  .entry-submit {
    button {
      margin-top:22px;
    }
  }
}
</style>