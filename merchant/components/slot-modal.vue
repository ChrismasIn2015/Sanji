<template>
	<view class='slot-modal'>
		<view class="item-container">
			<slot name='item1'></slot>
			<slot name='item2'></slot>
			<slot name='item3'></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
.slot-modal{
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
