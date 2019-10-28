<template>
  <!-- 忘记密码页面 -->
  <view id="forgetPassword">
	<verify-input ref="phone" label='手机号:' holder='请输入手机号' verifyRules='phone'></verify-input>
	<verify-input ref="postCode" label='验证码:' holder='请输入验证码' verifyRules='postCode' @getCode='getCode'></verify-input>
	<verify-input ref="password" label='新密码:' holder='请输入新密码' verifyRules='lettersAndNumbers'></verify-input>
    <button class="public-primary" type="primary" @click="toLogin">提交</button>
  </view>
</template>

<script>
import verifyInput from '@/components/verify-input'
import { getPhoneCode, setNewPassword } from '@/api/A-login'
import { toast } from '@/utils/common'

export default {
  data () {
    return {
		
    }
  },
  components: {
    verifyInput
  },
  methods: {
	// post code: 接口有问题 这个方法还需要修改
	getCode () {
		getPhoneCode(this.$refs.phone.inputValue).then(res => {
			console.log(res)
		}).catch(err => {
			// this.$refs.postCode.clearPostCode()
			toast(err.message)
		})
	},
	toLogin() {
		let phone = this.$refs.phone
		let postCode = this.$refs.postCode
		let password = this.$refs.password
		let verify = (phone.ifWarn && postCode.ifWarn && password.ifWarn)
		if (!verify) {
			setNewPassword(phone.inputValue, password.inputValue, postCode.inputValue).then(res => {
				console.log(res)
				if (res === null) {
					toast('修改成功！可以登录！')
					uni.navigateTo({ url: '/pages/main/login' })
				}
			}).catch(err => {
				console.log(err)
				toast(err.message)
			})
		} else {
			toast('请按提示输入~')
		}
		
	}
  }
}
</script>

<style lang="less" scoped>
#forgetPassword{
	padding: 30upx;
}
</style>