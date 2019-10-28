<template>
  <view class="login">
	<verify-input ref="phone" label='账号:' holder='请输入账号' verifyRules='phone'></verify-input>
	<verify-input ref="password" label='密码:' holder='请输入密码' verifyRules='lettersAndNumbers'></verify-input>
    <button class="public-primary" type="primary" @click="submitLogin">登录</button>
    <view class="action-row">
      <navigator url="./register">注册账号</navigator>
      <text>|</text>
      <navigator url="./forgetPassword">忘记密码</navigator>
    </view>
  </view>
</template>

<script>
import { login } from '@/api/A-login'
import verifyInput from '@/components/verify-input'
import { toast } from '@/utils/common'

export default {
  name: 'login',
  data () {
    return {
		
    }
  },
  components: {
	verifyInput
  },
  onLoad () {
    console.log('now token： ', uni.getStorageSync('merchantAdminUserToken'))
    if (uni.getStorageSync('merchantAdminUserToken')) {
      uni.switchTab({ url: '/pages/index/index' })
    }
  },
  methods: {
    // 登录
    submitLogin () {
		if (!this.$refs.phone.ifWarn && !this.$refs.password.ifWarn) {
		  login(this.$refs.phone.inputValue, this.$refs.password.inputValue).then((res) => {
			uni.setStorageSync('merchantAdminUserToken', res.Token)
			console.log('登录成功，已设置token', uni.getStorageSync('merchantAdminUserToken'))
			uni.switchTab({ url: '/pages/index/index' })
		  }).catch(err => {
			toast(err.message)
			console.log(err)
		  })
		} else {
			toast('请按提示输入~')
		}
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";
.login{
  padding: 30upx;
  .action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .action-row navigator {
    color: @public-color;
    padding: 0 10px;
  }
}
</style>