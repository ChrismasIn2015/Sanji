<template>
	<view @click='toShake2' >
		AAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAA
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
			console.log('shake1', accelerometerKeeper.getCoordinate())
		},
		methods: {
			toShake2 () {
				uni.navigateTo({
					url: '/pages/shake/shake2'
				})
			}
		}
	}
</script>

<style>
</style>
