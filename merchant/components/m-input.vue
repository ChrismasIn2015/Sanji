<template>
	<view class="m-input" :class="{'bordered':bordered}">
		<view v-if="label" class="title">{{label}}</view>
		<input :type="type" :disabled="disabled" :maxlength="maxlength" :value="value" @input="onInput" :placeholder="placeholder" name="input"/>
		<button v-if="withBtn" :disabled="btnDisabled || sent" class='code-msg' @tap="btnClick">{{ codeMsg }}</button>
	</view>
</template>

<script>

	export default {
		name: 'cuInput',
		props: {
			label: {
				type: String
			},
			type: {
				type: String
			},
			value: String,
			placeholder: {
				type: String
			},
			withBtn: {
				type: Boolean,
				default: false
			},
			btnDisabled: {
				type: Boolean,
				default: false
			},
			bordered: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: String
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				// 倒计时秒数
				countdown: 60,
				// 按钮上的文字
				codeMsg: '获取验证码',
				// 定时器
				timer: null,
				sent: false
			}
		},
		computed: {
			inputType() {
				const type = this.type
				return type === 'password' ? 'text' : type
			},
			displayable_() {
				return String(this.displayable) !== 'false'
			},
			focus_() {
				return String(this.focus) !== 'false'
			}
		},
		methods: {
			onInput (e) {
				this.$emit('input', e.target.value)
			},
			btnClick () {
				this.$emit('btnClick')
			},
			// 获取验证码
			startCountDown () {
				// 验证码60秒倒计时
				this.sent = true
				if (!this.timer) {
					this.timer = setInterval(() => {
						if (this.countdown > 0 && this.countdown <= 60) {
							this.countdown--
							if (this.countdown !== 0) {
								this.codeMsg = this.countdown + '秒后重新发送'
							} else {
								clearInterval(this.timer)
								this.codeMsg = '获取验证码'
								this.countdown = 60
								this.timer = null
								this.sent = false
							}
						}
					}, 1000)
				}
			}
		}
	}
</script>

<style>
.m-input .title {
  min-width: calc(4em + 15px);
}
.m-input {
	display: inline-flex;
	background-color: #ffffff;
	width: 100%;
	padding: 10px;
	border-bottom: 1px solid #F8F8F8;
}
.code-msg {
	font-size: 14px;
	width: 128px;
	height: 26px;
	line-height: 26px;
}
</style>
