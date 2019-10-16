<template>
	<view @click='toShake1' >
		BBBBBBBBBBBBBBBBBBBBBBBB
		BBBBBBBBBBBBBBBBBBBBBBBB
		BBBBBBBBBBBBBBBBBBBBBBBB
		BBBBBBBBBBBBBBBBBBBBBBBB
		BBBBBBBBBBBBBBBBBBBBBBBB
	</view>
</template>

<script>
	import accelerometerKeeper from './shake'
	export default {
		data() {
			return {
				
			}
		},
		onShow () {
			console.log('shake2', accelerometerKeeper.getCoordinate())
		},
		methods: {
			toShake1 () {
				uni.navigateTo({
					url: '/pages/shake/shake'
				})
			}
		}
	}
</script>

<style>
</style>
