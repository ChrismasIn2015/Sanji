<template>
	<view class="verify-input" :class="{'warn': ifWarn}">
		<label>{{ label }}</label>
		<input :placeholder="holder" :value="inputValue" @focus="clearInput" @input="inputPush" @blur="inputVerify" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// input
				inputValue: this.holder,
				
				// verify input
				ifWarn: true
			}
		},
		props:{
			label:{ type: String, default: '' },
			holder:{ type: String, default: '' },
			verifyRules:{ type: String, default: '' }
		},
		methods:{
			// icon close
			inputPush: function(event) {
				this.inputValue = event.target.value;
			},
			clearInput: function() {
				if( this.ifWarn ){
					this.ifWarn = false
					this.inputValue = '';
				}
			},
			// verify input
			inputVerify () {
				// 1
				if (this.inputValue === '') {
					this.ifWarn = true
					this.inputValue = this.holder
					return
				}
				
				// 2
				switch(this.verifyRules){
					case 'phone': {
						if (this.inputValue.length !== 11){
							this.ifWarn = true
							this.inputValue = '请输入11位手机号'
						}
					}
					break;
					case 'lettersAndNumbers': {
						let myReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
						if (!new RegExp(myReg).test(this.inputValue)){
							this.ifWarn = true
							this.inputValue = '请选择六位及以上英文加数字'
						}
					}
					break;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	// 自定义表单
	.verify-input{
		display: flex;
		align-items: center;
		padding: 0upx 20upx;
		border: 1px solid transparent;
		background-color: white;
		label{
			font-size: 32upx;
		}
		input{
			width:70%;
			margin:20upx 0upx 20upx 20upx;
		}
		.uni-icon-clear{
			margin-left: auto;
		}
	}
	.warn{
		color: red;
		border: 1px solid red;
	}

</style>
