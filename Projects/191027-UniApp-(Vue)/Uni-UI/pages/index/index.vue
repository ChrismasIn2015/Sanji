<template>
	<view class="index">
		<h3>表单组件</h3>
		<verify-input label='账号:' holder='请输入账号' verifyRules='phone'></verify-input>
		<verify-input label='密码:' holder='请输入密码' verifyRules='lettersAndNumbers'></verify-input>
		<h3>上传</h3>
	</view>
</template>

<script>
	import verifyInput from '@/components/verify-input.vue'
	
	export default {
		data() {
			return {
				
			}
		},
		components: {
			verifyInput
		},
		methods: {
			
		}
	}
</script>

<style lang='less' scoped>
	.index{
		padding: 20upx;
		background-color: #C0C0C0;
	}
</style>
