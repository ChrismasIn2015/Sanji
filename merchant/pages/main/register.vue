<template>
  <view class="register">
    <!-- 1. 注册新商户要填写的信息 -->
	<verify-input ref="phone" label='账号:' holder='请输入账号' verifyRules='phone'></verify-input>
	<verify-input ref="password" label='密码:' holder='请输入密码' verifyRules='lettersAndNumbers'></verify-input>
	<verify-input ref="merchantName" label='商户名称:' holder='请输入商户名称' verifyRules='none'></verify-input>
	<verify-input ref="merchantAddress" label='商户地址:' holder='请输入商户地址' verifyRules='none'></verify-input>
    <view class="private-picker">
      <text>入住小区</text>
      <picker @change="bindVillageChange" :value="indexVillage" :range="allVillages" range-key="title"> {{ allVillages[indexVillage].title }} </picker>
    </view>
    <view class="private-picker">
      <text>商户类型</text>
      <picker @change="bindTypeChange" :value="indexType" :range="merchanType" range-key="title"> {{ merchanType[indexType].title }} </picker>
    </view>
	<verify-input ref="concat" label='负责人:' holder='请输入负责人名称' verifyRules='none'></verify-input>
	<verify-input ref="subPhone" label='预约电话:' holder='请输入预约电话' verifyRules='phone'></verify-input>
	<verify-input ref="postCode" label='验证码:' holder='请输入验证码' verifyRules='postCode' @getCode='getCode'></verify-input>
    <!-- 2. 商家说明弹出内容 -->
    <view class="agree-tip">
      <text>点击“注册”即代表你同意 </text>
      <navigator url="./openShopExplain" hover-class="none" class="color-text">《金邻商家开店说明》</navigator>
    </view>
    <!--  3. 注册新商户事件 -->
    <button class="public-primary" type="primary" @click="toRegister">注册</button>
  </view>
</template>

<script>
import verifyInput from '@/components/verify-input'
import { register, getPhoneCode, getCommunities, getMerchantTypes } from '@/api/A-login'
import { toast } from '@/utils/common'
 
export default {
  name: 'register',
  data () {
    return {
	  // picker
      allVillages: [    // 入驻小区
        { title: '网络错误', value: -1 },
      ],
      merchanType: [   // 商户类型
        { title: '网络错误', value: -1 },
      ],
      indexVillage: 0,
      indexType: 0,
      phoneCode: -1
    }
  },
  components: {
	verifyInput
  },
  onLoad () {
    // 获取 小区列表 / 商户类型 ***************
    getCommunities().then((res) => {
      let temp = []
      for (let e in res.coummunities) { temp.push( { 'value':res.coummunities[e].Id, 'title':res.coummunities[e].Name } ) }
      this.allVillages = Object.assign([], temp)
    })
    getMerchantTypes().then((res) => {
      let temp = []
      for (let e in res.MerchantTypes) { temp.push( { 'value':res.MerchantTypes[e].Type, 'title':res.MerchantTypes[e].Name } ) }
      this.merchanType = Object.assign([], temp)
    })
    // 获取 小区列表 / 商户类型 结束***************
  },
  methods: {
	// picker
    bindTypeChange (e) { // 选择商户类型方法
      this.indexType = e.target.value
    },
    bindVillageChange (e) { // 选择入住小区方法
      this.indexVillage = e.target.value
    },
	
	// post code: 接口有问题 这个方法还需要修改
	getCode () {
		getPhoneCode(this.$refs.phone.inputValue).then(res => {
			console.log(res)
		}).catch(err => {
			// this.$refs.postCode.clearPostCode()
			toast(err.message)
		})
	},
	
    // register
    toRegister () {
		let phone = this.$refs.phone
		let password = this.$refs.password
		let merchantName = this.$refs.merchantName
		let merchantAddress = this.$refs.merchantAddress
		let concat = this.$refs.concat
		let subPhone = this.$refs.subPhone
		let postCode = this.$refs.postCode
		let allVerified = (
			phone.ifWarn
			&& password.ifWarn
			&& merchantName.ifWarn
			&& merchantAddress.ifWarn
			&& concat.ifWarn
			&& subPhone.ifWarn
			&& postCode.ifWarn
		)
		if (!allVerified) {
			register(
				phone.inputValue,
				password.inputValue,
				merchantName.inputValue,
				merchantAddress.inputValue,
				this.allVillages[this.indexVillage].value,
				this.merchanType[this.indexType].value,
				concat.inputValue,
				subPhone.inputValue,
				postCode.inputValue
			).then(res => {
				if (res === null) {
					toast('注册成功！可以登录！')
					uni.navigateTo({
						url: '/pages/main/login'
					})
				}
			})
		} else {
			toast('请按提示输入~')
		}
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";
.register{
  padding: 30upx;
  .private-picker{
    display: inline-flex;
    background-color: #ffffff;
    padding: 10px;
    width: 100%;
    margin-bottom: 1px;
    text {
      padding-right: 13px;
    }
  }
  .agree-tip{
    padding: 12px 0px;
    display: flex;
    justify-content: center;
    navigator{
      color: @public-color;
    }
  }
}
</style>