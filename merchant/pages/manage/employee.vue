<template>
  <view id="employee" class="public-mt20">
    <!-- 1. 商品信息 class类名均为uni.css中的样式 -->
    <view class="uni-list" >
      <block v-for="(listItem,index) in tableList" :key="index">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="detali(listItem.jobId)">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">{{ listItem.jobName }}</text>
              <text class="uni-text">招聘人数：{{ listItem.jobNum }}</text>
            </view>
            <view class="uni-triplex-right">
              <text class="uni-h5">{{ listItem.date }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 2. 弹窗组件 -->
    <modal :show="modal.show" :moreMsg="tableList" isPutaway @action="footerBtn"></modal>
    <addItem :show="add.show" :inputList="addLabel" pageTitle="职位" @back="footerBtn" @confirm="newJob">
      <view slot="radio" class="add-radio">
        <text style="width:120px;">结算方式：</text>
        <radio-group @change="payTypeChange">
          <label class="radio-title"><radio value="1" class="radio-item" :checked="add.isChecked" color="#5EA7B9" />日结</label>
          <label class="radio-title"><radio value="2" class="radio-item" :checked="add.isChecked" color="#5EA7B9" />周结</label>
          <label class="radio-title"><radio value="3" class="radio-item" :checked="!add.isChecked" color="#5EA7B9" />月结</label>
          <label class="radio-title"><radio value="4" class="radio-item" :checked="!add.isChecked" color="#5EA7B9" />小时</label>
          <label class="radio-title"><radio value="0" class="radio-item" :checked="!add.isChecked" color="#5EA7B9" />面议</label>
        </radio-group>
      </view>
    </addItem>
        <!-- @change="moneyChange" -->
    <!-- 3. 添加商品按钮 -->
    <view class="add-icon" v-if="addIcon" @click="addBtn"><img src="../../static/images/add.png" alt="add"></view>
  </view>
</template>

<script>
import modal from '@/components/modal'
import addItem from '@/components/add-item'
export default {
  name: 'employee',
  components: {
    modal, addItem
  },
  data () {
    return {
      addIcon: true,
      tableList: [ // 存放商品信息的数组
        { jobId: '1', jobName: '测试', jobNum: 5, salary: '300' ,payType: '2', 
          isPutaway: 1, creatDate: '2019/10/28 09:28', date: '2019/10/25', applyNum: 3 },
        { jobId: '2', jobName: '销售', jobNum: 6, salary: '600', payType: '4',
          isPutaway: 1, creatDate: '2019/10/28 09:28', date: '2019/10/26', applyNum: 2 },
        { jobId: '3', jobName: '运营', jobNum: 7, salary: '300', payType: '3',
          isPutaway: 1, creatDate: '2019/10/28 09:28', date: '2019/10/24', applyNum: 1 }
      ],
      moreMsg: [],
      addLabel: [ // 添加新职位所需要的输入框
        { title: '职位名称：'},
        { title: '招聘人数：'},
        { title: '薪资：'}
      ],
      modal: {
        show: false
      },
      add: {
        show: false,
        isChecked: false,
        payType: ''  // 结算方式
      }
    }
  },
  methods: {
    detali (id) { // 根据商品ID查看该商品详情
      console.log(id)
      this.modal.show = true
    },
    payTypeChange (e) {
      console.log(e)
      this.payType = e.detail.value
      console.log(this.payType)
    },
    footerBtn (action) { // 底部按钮事件
      console.log(action)
      if (action === 'back') {  // action 为按钮的动作名词
        this.modal.show = false
        this.add.show = false
      }
    },
    newJob (data) {
      console.log(data) // Object格式的数据
      console.log(this.payType) // 结算方式
    },
    addBtn () {
      this.add.show = true
    }
  }
}
</script>

<style lang="less" scoped>
#employee{
  .add-icon{
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
  .add-radio{
    display: flex;
    padding: 12px 16px;
    border-bottom: 1px solid #f7f7f7;
    .radio-item{
      transform:scale(0.7)
    }
  }
}
</style>