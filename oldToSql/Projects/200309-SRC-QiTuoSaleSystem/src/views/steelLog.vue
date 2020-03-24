<template>
  <div class="index">
    <!-- 标题 -->
    <div class="index-nav">
      <div class="title">奇拓金属-日志管理</div>
    </div>
    <!-- 功能区 -->
    <div class="index-ribbon flex-side">
      <div class="left-btns">
        <div
          class="common-btn"
          :class="{'common-btn-toggle': logIndex === 0}"
          @click.self="getInLog"
        >入库记录</div>
        <div
          class="common-btn"
          :class="{'common-btn-toggle': logIndex === 1}"
          @click.self="getOutLog"
        >出库记录</div>
      </div>
      <div class="right-btns">
        <div class="common-btn-tip" v-show="logIndex === 0">累计营业成本: {{ costAll }}</div>
        <div class="common-btn-tip" v-show="logIndex === 1">累计营业收入: {{ incomeAll }}</div>
        <div class="common-btn" @click.self="toIndex">返回库存</div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="index-table">
      <div class="row">
        <div class="column">分类</div>
        <div class="column">名称</div>
        <div class="column">长度/厘米</div>
        <div class="column">宽度/厘米</div>
        <div class="column">厚度/厘米</div>
        <div class="column">数量/张</div>
        <div class="column">重量/吨</div>
        <div class="column">成本/元</div>
        <div class="column">时间</div>
      </div>
      <div class="row" v-for="(item, index) in logList" :key="index">
        <div class="column">{{item.steelType === 0 ? "板" : "卷"}}</div>
        <div class="column">{{item.steelName}}</div>
        <div class="column">{{item.steelLength}}</div>
        <div class="column">{{item.steelWidth}}</div>
        <div class="column">{{item.steelHeight}}</div>
        <div class="column">{{item.count}}</div>
        <div class="column">{{item.weight}}</div>
        <div class="column">{{item.price}}</div>
        <div class="column">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 记录
      logIndex: 0, // 0 入库 1 出库
      logList: [],
      costAll: 0,
      incomeAll: 0
    };
  },
  mounted() {
    this.getInLog();
  },
  methods: {
    getInLog() {
      this.logIndex = 0;
      let list = this.$SteelDB.getInList();
      let tempCount = 0;
      this.costAll = 0;
      list.forEach(item => {
        tempCount += item.price;
      });
      this.costAll = tempCount;
      this.logList = Object.assign([], list);
    },
    getOutLog() {
      this.logIndex = 1;
      let list = this.$SteelDB.getOutList();
      let tempCount = 0;
      this.incomeAll = 0;
      list.forEach(item => {
        tempCount += item.price;
      });
      this.incomeAll = tempCount;
      this.logList = Object.assign([], list);
    },
    toIndex() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  padding: 2rem;
  //
  .index-nav {
    .title {
      color: $common-main;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  //
  .index-ribbon {
    margin-bottom: 1rem;
    .left-btns {
      .common-btn {
        margin-right: 1rem;
      }
    }
    .right-btns {
      .common-btn {
        margin-left: 1rem;
      }
    }
  }
  //
  .index-table {
    border: 1px solid $common-main;
    border-bottom: 0px solid $common-main;
    .row {
      border-bottom: 1px solid $common-main;
      display: flex;
      justify-content: space-between;
      &:hover {
        background-color: $common-tip-lower;
      }
      .column {
        width: 10%;
        padding: 1rem;
        // text-cut
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
