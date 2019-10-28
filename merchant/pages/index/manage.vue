<template>
  <view class="manage public-mt20">
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
        { title: '商品管理', url: '/pages/manage/goods' },
        { title: '活动管理', url: '/pages/manage/activity' },
        { title: '优惠券管理', url: '/pages/manage/coupons' },
        { title: '招聘管理', url: '/pages/manage/employee' },
        { title: '广告管理', url: '' },
      ]
    }
  },
  methods: {
    jumPages (target) {
      target ? uni.navigateTo({ url: target }) : toast('敬请期待~')
    }
  }
}
</script>

<style lang="less" scoped>

</style>