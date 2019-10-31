<template>
	<view class="index">
		<h3>表单组件</h3>
		<verify-input label='账号:' holder='请输入账号' verifyRules='phone'></verify-input>
		<verify-input label='密码:' holder='请输入密码' verifyRules='lettersAndNumbers'></verify-input>
		<h3>上传</h3>
		<view ref='self'></view>
	</view>
</template>

<script>
	import verifyInput from '@/components/verify-input.vue'
	import Vue from 'vue'
	
	export default {
		data() {
			return {
				
			}
		},
		mounted () {
			// 方法1
			// 1 构建一个组件构造函数
			let Verifys = Vue.extend({
				render (h) {
					return h(
						verifyInput, 
						{}, 
						[]
					)
				}
			})
			
			// 2 在HTML中创建ref容器
			// 3 通过构造器生成Vue实例/组件
			let myClass = new Verifys()
			
			// 4 在对应DOM上挂载这个Vue实例/组件
			myClass.$mount(this.$refs.self.$el)
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
