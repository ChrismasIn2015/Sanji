<template>
	<view class='tailor-modal'>
		<view class="item-container">
			<slot name='top'/>
			<view ref='myRoot'/>
			<slot name='bottom'/>
		</view>
	</view>
</template>

<script>
	import getComponentNodeTrees from '@/utils/privateVNode.js'
	
	export default {
		data() {
			return {
				
			}
		},
		props: {
			nodeMap: { Type: Array, default: [] }
		},
		mounted () {
			
			// 1. 获取构造器
			let NodeConstructor = getComponentNodeTrees(this.nodeMap)
			// 2. 创建实例
			let myNode = new NodeConstructor()
			// 3. 挂载组件
			myNode.$mount(this.$refs.myRoot.$el)
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.tailor-modal{
	position: fixed;
	top: 0upx;
	left: 0upx;
	background-color: rgba(0,0,0,0.5);
	width: 100%;
	height: 100%;
	.item-container{
		margin: 0 auto;
		margin:30upx;
		padding: 30upx;
		background-color: white;
	}
}

</style>
