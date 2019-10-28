<template>
  <!-- 
    弹窗组件:
    ====> 点击一条数据会弹出详细内容
    ====> 通过class属性show 和 hidden控制 显示和隐藏
    ====> show = true // show(display: block)
    ====> show = false // hidden(display: none)
   -->
  <view :class="show?'show':'hidden'">
    <view class="shade"></view>
    <view class="modal">
      <uni-card :is-shadow="true" mode="style" thumbnail="" note="true" @click="clickCard">
        <!-- <view class="modal-label" v-for="(item,index) in moreMsg" :key="index">  
          <input v-model="item.value" type="text" :disabled="disabled"/>
        </view> -->
        <template v-slot:footer>
          <view class="footer-box">
            <view class="footer-box__item" @click.stop="btnClick('back')"><text>返回</text></view>
            <view class="footer-box__edit" @click.stop="btnClick('edit')"><text>{{ centerText }}</text></view>
            <view class="footer-box__delete" @click.stop="btnClick('delete')"><text>{{ rightText }}</text></view>
          </view>
        </template>
      </uni-card>
    </view>
  </view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card.vue'
export default {
  components: {
    uniCard
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    moreMsg: {
      type: Array,
    },
    centerText: {
      type: String,
      default: '编辑'
    },
    rightText: {
      type: String,
      default: '删除'
    }
  },
  methods: {
    btnClick (action) {
      this.$emit('action', action)
    }
  }
}
</script>

<style lang="less" scoped>
.show{ display: block; }
.hidden{ display: none; }
.shade{
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(0,0,0,0.2);
  transition: all 0.3s ease-in-out 0s;
}
.modal{
  width: 100%;
  position: absolute;
  top: 120px;
  z-index: 999;
  .modal-label{
    padding: 6px;
    display: inline-flex;
    border-bottom: 1px solid #f7f7f7;
  }
  .footer-box {
    display: flex;
    justify-content: space-between;
    .footer-box__edit {
      color: green;
    }
    .footer-box__delete {
      color: red;
    }
  }
}
</style>