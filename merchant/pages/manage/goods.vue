<template>
  <view id="goods" class="public-mt20">
    <!-- 1. 商品信息 class类名均为uni.css中的样式 -->
    <view class="uni-list" >
      <block v-for="(listItem,index) in tableList" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="detali(listItem.GoodsId)">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">{{ listItem.GoodsName }}</text>
              <text class="uni-text">商品单价：{{ listItem.PurchasePrice }}</text>
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
    <!-- 2. 弹窗组件（详细信息 + 添加新商品） -->
    <modal :show="modal.show" :moreMsg="tableList" isPutaway @action="footerBtn"></modal>
    <addItem :show="add.show" :inputList="addLabels" pageTitle="商品" @action="footerBtn"></addItem>
    <!-- 3. 添加商品按钮 -->
    <view class="add-goods" v-if="addIcon" @click="addBtn"><img src="../../static/images/add.png" alt="add"></view>
  </view>
</template>

<script>
import modal from '@/components/modal'
import addItem from '@/components/add-item'
export default {
  name: 'goods',
  components: {
    modal, addItem
  },
  data () {
    return {
      addIcon: true,
      tableList: [ // 存放商品信息的数组
        { GoodsId: '1', GoodsName: '哇哈哈', PurchasePrice: '2', OfferPrice: '4', 
          GoodsNorms: '瓶/200ml', GoodsCount: '300', isPutaway: 1, date: '2019/10/25' },
        { GoodsId: '2', GoodsName: '营养快线', PurchasePrice: '4', OfferPrice: '4', 
          GoodsNorms: '瓶/200ml', GoodsCount: '300', isPutaway: 2, date: '2019/10/26' },
        { GoodsId: '3', GoodsName: '薯愿：', PurchasePrice: '9', OfferPrice: '4', 
          GoodsNorms: '瓶/200ml', GoodsCount: '300', isPutaway: 1, date: '2019/10/24' }
      ],
      moreMsg: [],
      addLabels: [ // 添加新商品所需要的输入框
        { title: '商品名称：'},
        { title: '商品规格：'},
        { title: '库存：'},
        { title: '进货单价：'},
        { title: '商品单价：'},
        { title: '商品排序：'}
      ],
      modal: {
        show: false
      },
      add: {
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
      if (action === 'back') { 
        this.modal.show = false
        this.add.show = false
      }
    },
    addBtn () {
      this.add.show = true
    }
  }
}
</script>

<style lang="less" scoped>
#goods{
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