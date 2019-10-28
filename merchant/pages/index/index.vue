<template>
  <view class="index public-mt20">
    <uni-grid :column="3" :showBorder="false"  :square="true">
      <uni-grid-item v-for='(item, index) in merchantApps' :key="index">
        <text class="text" @click='jumPages(item.url)'> {{item.title}} </text>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script>
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
export default {
  components: {
    uniGrid,uniGridItem
  },
  data ()　{
    return {
      merchantApps: [
        { title: '商户信息', url: '/pages/account/merchantInfo' },
        { title: '商户充值', url: '/pages/account/recharge' },
        { title: '入驻小区', url: '/pages/account/communities' }
      ]
    }
  },
  methods: {
    jumPages (target) {
      console.log(target)
      target ? uni.navigateTo({ url: target }) : toast('敬请期待~')
    }
  }
}
</script>

<style lang="less" scoped>

</style>