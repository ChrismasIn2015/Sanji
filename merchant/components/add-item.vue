<template>
  <view :class="show?'show':'hidden'">
    <view class="shade"></view>
    <view class="add">
      <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in inputList" :key="index">
        {{item.title}}<input v-model="datas[index]" type="text" :disabled="disabled"/>
      </label>
      <slot name="radio"></slot>
      <slot name="date"></slot>
      <!-- 描述内容框 -->
      <label class="uni-list-cell uni-list-cell-pd">
        <text style="width: 102px;">{{pageTitle}}描述：</text><textarea placeholder="描述不得超过300字" v-model="describe" auto-height	 maxlength="300" />
      </label>
      <!-- 上传图片 -->
      <view class="add-upload">
        <view> {{ pageTitle }}图片：</view>
        <view class="add-upload-img" v-if="imgUrl"><img :src="imgUrl" @click="previewImg()" alt="logo"></view>
        <view class="add-upload-img" v-else @click.native="addImg()"><img src="@/static/images/plus.png" alt="logo"></view>
      </view>
      <!-- 弹窗按钮 -->
      <view class="add-btn">
        <button class="footer-btn cancel" @tap="handleBack('back')"> {{cancelText}} </button>
        <button class="footer-btn confirm" @tap="handleConfirm()"> {{confirmText}} </button>
      </view>
    </view>
  </view>
</template>

<script>
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
export default {
  data () {
    return {
      datas: [],     // 添加的内容信息
      imgUrl: '',    // 商品图片
      describe: ''   // 内容描述
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '返回'
    },
    confirmText: {
      type: String,
      default: '提交'
    },
    title: { 
      type: String 
    },
    inputList: { 
      type: Array
    },
    addImage: { type: String },
    pageTitle: { type: String }
  },
  methods: {
    addImg () { // 添加图片方法
      let self = this
      uni.chooseImage({
        count: 1,
        success (res) {
          self.imgUrl = res.tempFilePaths[0]
        }
      })
    },
    previewImg () {  // 预览图片大小
      let self = this
      uni.previewImage({
        current: 1,
        urls: [self.imgUrl]
      })
    },
    handleBack (action) {
      this.$emit('back', action)
    },
    handleConfirm () {
      let submitData = {
        goodsMsg: this.datas,
        imgUrl: this.imgUrl,
        describe: this.describe
      }
      this.$emit('confirm', submitData)
    }
  }
}
</script>

<style lang="less" scoped>
.show{
  display: block;
}
.hidden{
  display: none;
}
.shade{
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0,0,0,0.2);
  transition: all 0.3s ease-in-out 0s;
}
.add{
  width: 80%;
  background-color:#FFFFFF;
  position: absolute;
  top: 5%;
  left: 10%;
  z-index: 999;

  .add-upload{ 
    padding: 12px 16px;
    .add-upload-img{
      width: 96px;
      height: 96px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .add-btn{
    display: flex;
    .footer-btn{
      width: 50%;
      font-size: 16px;
      border-top: 1px solid #f7f7f7;
      border-radius: 0px;
      background-color: rgba(0, 0, 0, 0);      
      &:after{ border: none; }
    }
    .cancel{ color: #333333;border-right: 1px solid #f7f7f7; }
    .confirm{ color: #5EA7B9; }
  }
}
</style>
