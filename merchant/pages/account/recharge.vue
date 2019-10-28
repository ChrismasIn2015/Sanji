<template>
  <view class="recharge">
    <!-- 1. 充值金额 -->
    <mInput v-model="Amount" label="请选择/输入充值金额："></mInput>
    <radio-group class="pay-money private-radio" @change="moneyChange">
      <label class="radio-title"><radio value="10" :checked="isChecked" color="#5EA7B9" />10元</label>
      <label class="radio-title"><radio value="50" :checked="isChecked" color="#5EA7B9" />50元</label>
      <label class="radio-title"><radio value="100" :checked="!isChecked" color="#5EA7B9" />100元</label>
    </radio-group>
	<view>您的余额： {{ '接口开发中' }}</view>
    <!-- 3. 支付方式 -->
    <radio-group class="pay-type private-radio" @change="typeChange">
      <text>支付方式：</text>
      <label class="radio-title"><radio value="2" :checked="isChecked" color="#5EA7B9" />支付宝</label>
      <label class="radio-title"><radio value="1" :checked="!isChecked" color="#5EA7B9" />微信</label>
    </radio-group>
    <button class="public-primary" @click="submitMsg">提交</button>
    <button class="public-primary" @click="toRechargeList">查看消费明细</button>
	
	<!-- modal -->
	<slot-modal v-if='modalShow'>
		<scroll-view scroll-y=true class='recharge-list' slot='item1'>
			<uni-collapse ref="add" class="warp">
				<uni-collapse-item v-for="(item, index) in rechargeList" :key="index" :title="item.AddTime">
					<view class="rechargeList-item">
						<view>充值金额: {{ item.Money }}</view>
						<view>支付方式: {{ item.PayType === 1 ? '微信' : '支付宝' }}</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
		<view slot='item2'>
			<button class="public-primary-mini" @click="cancelModal">返回</button>
		</view>
	</slot-modal>
  </view>
</template>

<script>
import mInput from '@/components/m-input'
import slotModal from '@/components/slot-modal.vue'
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
import { getIncomeExpenseList, addFunds } from '@/api/B-account'

export default {
  name: 'recharge',
  components: {
    mInput,
	slotModal,
	uniCollapse,
	uniCollapseItem
  },
  data () {
    return {
		// modal 
		modalShow: false,
		
		//
		rechargeList: [],
		
		// pay
		Amount: '100',        // 充值金额
		Type: '1',         // 支付方式
		isChecked: false,
		providerList: [] // 本地支持的支付通道
    }
  },
  onLoad () {
	// 1 = 判断本地支持的支付通道
	uni.getProvider({
	    service: "payment",
	    success: (e) => {
	        console.log("payment success:" + JSON.stringify(e));
	        let providerList = [];
	        e.provider.map((value) => {
	            switch (value) {
	                case 'alipay':
	                    providerList.push({
	                        name: '支付宝',
	                        id: value,
	                        loading: false
	                    });
	                    break;
	                case 'wxpay':
	                    providerList.push({
	                        name: '微信',
	                        id: value,
	                        loading: false
	                    });
	                    break;
	                default:
	                    break;
	            }
	        })
	        this.providerList = providerList;
	    },
	    fail: (e) => {
	        console.log("获取支付通道失败：", e);
	    }
	})
	
	// 2
	getIncomeExpenseList().then(res => {
		res = [
			{
				"MerchantId": 193,
				"TradeNo": "201910251103499928119",
				"Status": 0,
				"PayId": null,
				"PayType": 1,
				"PaymentType": 1,
				"Money": 100.0,
				"Currency": 100.0,
				"AddTime": "2019-10-25 11:03:59",
				"PayTime": null,
				"VillageId": null,
				"Id": 28
			},
		]
		console.log('消费记录', res)
		this.rechargeList = Object.assign([], res)
	})
  },
  methods: {
    moneyChange (e) {
      this.Amount = e.detail.value
    },
    typeChange (e) {
      this.Type = e.detail.value
    },
    submitMsg () {
      addFunds(this.Type, this.Amount).then(res => {
		  console.log(res)
	  })
    },
    toRechargeList () {
      this.modalShow = true
    },
	cancelModal () {
		this.modalShow = false
	}
  }
}
</script>

<style lang="less" scoped>
.recharge{
	padding: 30upx;
	.recharge-list{
		height: 80vh;
	}
	.current-money{
		display: flex;
		background-color: #ffffff;
		flex: 1;
		.money-tip{
			font-size: 14px;
			width: 70%;
			line-height: 41px;
			color: #A9A9A9;
		}
	}
	.private-radio{
		padding: 10px;
		border-bottom: 1px solid #f7f7f7;
		background-color: #ffffff;
		.radio-title{
			padding: 0px 3px;
			radio{
				transform:scale(0.7);        
			}
		}
	}
}
</style>