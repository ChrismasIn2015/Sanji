<template>
  <view id="activity" class="public-mt20">
    <!-- 1. 活动信息 class类名均为uni.css中的样式 -->
    <view class="uni-list" >
      <block v-for="(listItem,index) in tableList" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="detali(listItem.ActivityId)">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">{{ listItem.ActivityName }}</text>
              <text class="uni-text">优先级：{{ listItem.priority }}</text>
            </view>
            <view class="uni-triplex-right">
              <text class="uni-h5">{{ listItem.date }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 2. 弹窗组件 -->
    <modal :show="modal.show" :moreMsg="tableList" @action="footerBtn"></modal>
    <!-- 3. 添加商品按钮 -->
    <view class="add-goods" v-if="addIcon" @click="addGoods"><img src="../../static/images/add.png" alt="add"></view>
  </view>
</template>

<script>
import modal from '@/components/modal'
export default {
  name: 'activity',
  components: {
    modal, 
  },
  data () {
    return {
      addIcon: true,
      tableList: [
        { ActivityId: '1', ActivityName: '免费赠送饮品', priority: 1, date: '2019/10/25' },
        { ActivityId: '2', ActivityName: '领取礼物', priority: 2,  date: '2019/10/26' }
      ],
      modal: {
        show: false
      }
    }
  },
  methods: {
    detali (id) { // 根据商品ID查看该商品详情
      console.log(id)
      this.modal.show = true
    },
    footerBtn (action) { // 底部按钮事件
      console.log(action)
      if (action === 'back') { this.modal.show = false }
    }
  }
}
</script>

<style lang="less" scoped>
#activity{
  .add-goods{
    position: absolute;
    bottom: 64px;
    right: 40px;
    width: 32px;
    height: 32px;
    img {
      width: 100%;
      height: 100%;  
    }
  }
}
</style>