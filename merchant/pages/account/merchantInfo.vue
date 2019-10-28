<template>
  <view class="message">
    <!-- 1. 商户的基本信息 -->
    <uni-card class="basic-massage" title="基本信息">
		<view>商户名称： {{ merchantInfo.Name }}</view>
		<view>商户分类： {{ merchantType }}</view>
		<view>营业地址： {{ merchantInfo.Address }}</view>
		<view>营业执照： </view>
		<view v-if='!(merchantInfo.businessImg1 && merchantInfo.businessImg2 && merchantInfo.businessImg3)'>* 暂未上传营业执照</view>
		<view class='basic-images'>
			<image v-if='merchantInfo.businessImg1'/>
			<image v-if='merchantInfo.businessImg2'/>
			<image v-if='merchantInfo.businessImg3'/>
		</view>
		<button class="public-primary-mini" @click="updateBasic('basic')">编辑</button>
    </uni-card>
    <!-- 2. 商户的更多信息 -->
    <uni-card class="more-message" title="更多信息">
		<view>负责人： {{ merchantInfo.Contact }}</view>
		<view>预约电话： {{ merchantInfo.OrderPhone }}</view>
		<view>注册手机号： {{ merchantInfo.SubscribePhone }}</view>
		<view>Logo：</view>
		<view v-if='!(merchantInfo.Logo)'>* 暂未上传Logo</view>
		<view class='more-logo'>
			<image v-if='merchantInfo.Logo'/>
		</view>
		<view>环境图：</view>
		<view v-if='!(merchantInfo.ShowImage)'>* 暂未上传环境图片</view>
		<view class='more-showImage'>
			<image v-if='merchantInfo.ShowImage'/>
		</view>
		<view>
			<text>营业时间：</text>
			<text>{{ merchantInfo.BusinessStartTime ? merchantInfo.BusinessStartTime[0] + '~' + merchantInfo.BusinessEndTime[0] : '未设置' }}</text>
			<text>{{ merchantInfo.BusinessStartTime ? merchantInfo.BusinessStartTime[1] + '~' + merchantInfo.BusinessEndTime[1] : '' }}</text>
		</view>
		<view>是否支持外送： {{ merchantInfo.IsDelivery ? '是' : '否' }}</view>
		<view>WIFI： {{ merchantInfo.WIFI ? ('账号:' + merchantInfo.WIFI + ' / 密码:' + merchantInfo.WifiPassword) : '未设置' }}</view>
      <button class="public-primary-mini" @click="updateBasic('more')">编辑</button>
    </uni-card>
	
	<!-- modal -->
	<slot-modal v-if='basicModalShow || moreModalShow'>
		<view slot='item1' v-if='basicModalShow'>
			<view>基本信息</view>
			<verify-input ref="merchantName" label='商户名称:' holder='请输入商户名称' verifyRules='none'></verify-input>
			<view class="private-picker">
			  <text>商户类型</text>
			  <picker @change="bindTypeChange" :value="merchantypeIndex" :range="merchanType" range-key="title"> {{ merchanType[merchantypeIndex].title }} </picker>
			</view>
			<verify-input ref="merchantAddress" label='营业地址:' holder='请输入营业地址' verifyRules='none'></verify-input>
			<view>上传营业执照</view>
			<view class='upload-image'>
				<view class='upload-entry' @click="uploadImage">+</view>
			</view>
		</view>
		<scroll-view scroll-y="true" slot='item2' v-if='moreModalShow' style="height:80vh;">
			<view>更多信息</view>
			<verify-input ref="contact" label='负责人:' holder='请输入负责人名称' verifyRules='none'></verify-input>
			<verify-input ref="orderPhone" label='预约电话:' holder='请输入预约电话' verifyRules='phone'></verify-input>
			<verify-input ref="subPhone" label='注册手机号:' holder='注册手机号' verifyRules='phone'></verify-input>
			<view>上传Logo</view>
			<view class='upload-image'>
				<view class='upload-entry' @click="uploadImage">+</view>
			</view>
			<view>上传店铺环境图</view>
			<view class='upload-image'>
				<view class='upload-entry' @click="uploadImage">+</view>
			</view>
			<view class="private-picker">
				<text>营业时间</text>
				<picker mode="multiSelector" @change="bindTimeChange1" :value="businessTimeArrayIndex1" :range="businessTimeArray1"> {{ businessTimeFormat1 }} </picker>
				<text>~</text>
				<picker mode="multiSelector" @change="bindTimeChange2" :value="businessTimeArrayIndex2" :range="businessTimeArray2"> {{ businessTimeFormat2 }} </picker>
				<text>/</text>
				<picker mode="multiSelector" @change="bindTimeChange3" :value="businessTimeArrayIndex3" :range="businessTimeArray3"> {{ businessTimeFormat3 }} </picker>
				<text>~</text>
				<picker mode="multiSelector" @change="bindTimeChange4" :value="businessTimeArrayIndex4" :range="businessTimeArray4"> {{ businessTimeFormat4 }} </picker>
			</view>
			<view class="private-picker">
				<text>是否支持外送</text>
				<switch @change='deliverySupport'/>
			</view>
			<text>店内WIFI</text>
			<switch :checked='wifiSwitch' @change='wifiSupport'/>
			<verify-input v-if='wifiSwitch' ref="WIFI" label='WIFI:' holder='请输入WIFI' verifyRules='none'></verify-input>
			<verify-input v-if='wifiSwitch' ref="WIFIPassword" label='WIFIPassword:' holder='请输入WIFI密码' verifyRules='none'></verify-input>
		</scroll-view>
		<view class='modal-btns' slot='item3'>
			<button class="public-primary-mini" @click="cancelModal">取消</button>
			<button class="public-primary-mini">保存</button>
		</view>
	</slot-modal>
  </view>
</template>

<script>
import uniCard from "@/components/uni-card/uni-card"
import verifyInput from '@/components/verify-input'
import slotModal from '@/components/slot-modal.vue'
import { toast } from '@/utils/common'
import { getMerchantInfo, uploadFile } from "@/api/B-account"

export default {
  data () {
    return {
		// modal
		basicModalShow: false,
		moreModalShow: false,
		
		// merchantInfo
		merchantInfo: {
			Name: '网络错误',
		},
		
		// picker
		merchanType: [
			{ title: '美食餐饮', value: 1 },
			{ title: '蔬菜水果', value: 2 },
			{ title: '医药', value: 3 },
			{ title: '便利商超', value: 4 },
			{ title: '休闲娱乐', value: 5 },
			{ title: '丽人', value: 6 },
			{ title: '生活服务', value: 7 },
			{ title: '服装纺织', value: 8 },
			{ title: '酒店', value: 9 },
			{ title: '数码家电', value: 10 },
			{ title: '装修建材', value: 11 },
			{ title: '投资理财', value: 12 },
			{ title: '手工DIY', value: 13 },
			{ title: '美术绘画', value: 14 },
			{ title: '其他', value: 15 },
		],
		merchantypeIndex: 0,
		// 下面是四段营业时间picker
		businessTimeArray1: [['网络错误'], ['网络错误']],
		businessTimeArrayIndex1: [0, 0],
		businessTimeArray2: [['网络错误'], ['网络错误']],
		businessTimeArrayIndex2: [0, 0],
		businessTimeArray3: [['网络错误'], ['网络错误']],
		businessTimeArrayIndex3: [0, 0],
		businessTimeArray4: [['网络错误'], ['网络错误']],
		businessTimeArrayIndex4: [0, 0],
		
		// wifi switch
		wifiSwitch: false,
    }
  },
  computed:{
	merchantType () {
		switch(this.merchantInfo.Type){
			case 1 : { return '美食餐饮' } break;
			case 2 : { return '蔬菜水果' } break;
			case 3 : { return '医药' } break;
			case 4 : { return '便利商超' } break;
			case 5 : { return '休闲娱乐' } break;
			case 6 : { return '丽人' } break;
			case 7 : { return '生活服务' } break;
			case 8 : { return '服装纺织' } break;
			case 9 : { return '酒店' } break;
			case 10 : { return '数码家电' } break;
			case 11 : { return '装修建材' } break;
			case 12 : { return '投资理财' } break;
			case 13 : { return '手工DIY' } break;
			case 14 : { return '美术绘画' } break;
			case 15 : { return '其他' } break;
			default: return '未找到该类型'
		}
	},
	businessTimeFormat1 () {
		return this.businessTimeArray1[0][this.businessTimeArrayIndex1[0]] + ':' + this.businessTimeArray1[1][this.businessTimeArrayIndex1[1]]
	},
	businessTimeFormat2 () {
		return this.businessTimeArray2[0][this.businessTimeArrayIndex2[0]] + ':' + this.businessTimeArray2[1][this.businessTimeArrayIndex2[1]]
	},
	businessTimeFormat3 () {
		return this.businessTimeArray3[0][this.businessTimeArrayIndex3[0]] + ':' + this.businessTimeArray3[1][this.businessTimeArrayIndex3[1]]
	},
	businessTimeFormat4 () {
		return this.businessTimeArray4[0][this.businessTimeArrayIndex4[0]] + ':' + this.businessTimeArray4[1][this.businessTimeArrayIndex4[1]]
	}
  },
  components: {
    uniCard,
	verifyInput,
	slotModal
  },
  onLoad () {
	//
	getMerchantInfo().then(res => {
		console.log(res)
		this.merchantInfo = res
	}).catch(err => {
		toast(err.message)
	})
	// 准备营业时间picker
	let hours = []
	for (let i=0; i<23; i++) {
		i < 10 ? i = '0' + i : i
		hours.push(i) 
	}
	this.businessTimeArray1 = []
	this.businessTimeArray1.push(hours)
	this.businessTimeArray1.push(['00', '15', '30', '45'])
	this.businessTimeArray2 = []
	this.businessTimeArray2.push(hours)
	this.businessTimeArray2.push(['00', '15', '30', '45'])
	this.businessTimeArray3 = []
	this.businessTimeArray3.push(hours)
	this.businessTimeArray3.push(['00', '15', '30', '45'])
	this.businessTimeArray4 = []
	this.businessTimeArray4.push(hours)
	this.businessTimeArray4.push(['00', '15', '30', '45'])
  },
  methods: {
	updateBasic (type) {
		type === 'basic' ? this.basicModalShow = true : ''
		type === 'more' ? this.moreModalShow = true : ''
	},
	cancelModal () {
		this.basicModalShow = false
		this.moreModalShow = false
	},
	
	// picker
	bindTypeChange (e) { this.merchantypeIndex = e.target.value },
	bindTimeChange1 (e) { this.businessTimeArrayIndex1 = e.target.value },
	bindTimeChange2 (e) { this.businessTimeArrayIndex2 = e.target.value },
	bindTimeChange3 (e) { this.businessTimeArrayIndex3 = e.target.value },
	bindTimeChange4 (e) { this.businessTimeArrayIndex4 = e.target.value },
	
	// upload
	uploadImage () {
		// step 1
		uni.chooseImage({
			count: 1, // 最大选择图片数
			sizeType: ['original'], // 选择原图
			// step 2: get local file path
			success: (res) => {
				console.log(res.tempFilePaths)
				// step 3: uni.uploadFile(serveUrl, localFilePath, localFileName, complete)
				uploadFile(res.tempFilePaths[0]).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		})
	},
	deliverySupport (e) {
		this.merchantInfo.isDelivery = e.detail.value
	},
	wifiSupport (e) {
		this.wifiSwitch = e.detail.value
	}
  }
}
</script>

<style lang="less" scoped>
.message{
	// all ----------------------------------
	uni-card{
		padding-top: 30upx;
	}
	.modal-btns{
		display: flex;
		justify-content: center;
		button{
			margin: 0 20upx;
		}
	}
	.private-picker{
		display: flex;
		margin: 10px auto;
		picker{
			display: inline-block;
			border: 1px solid black;
		}
		text {
			padding-right: 13px;
		}
	}
	.upload-image{
		.upload-entry{
			display: inline-block;
			width: 96upx; height: 96upx;
			font-size: 48upx;
			text-align: center;
			line-height: 96upx;
			background-color: #8F8F94;
		}
	}
	// 1----------------------------------
	.basic-massage {
		.basic-images{
			image{ width: 72upx; height: 72upx; }
		}
	} 
	// 2----------------------------------
	.more-message{

	}
}
</style>