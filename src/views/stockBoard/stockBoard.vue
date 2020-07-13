<template>
  <div class="stock flex-y">
    <!-- 0 -->
    <div class="stock-nav flex">
      <div class="common-btn toggle" @click.stop="pageIndex = 0">首页</div>
    </div>

    <!-- 1 -->
    <div class="stock-content">
      <div class="stock-table flex" v-if="pageIndex === 0">
        <div
          class="column"
          v-for="(blockValue, blockKey, index) in blockMap"
          :key="index"
          @click.stop="setPageIndex(0, blockKey)"
        >{{ blockKey }}</div>
      </div>
      <div class="stock-table flex" v-if="pageIndex === 1">
        <div v-for="(item, index) in blockMapKeyList" :key="index">
          <div class="column" @click.stop="setPageIndex(1, item)">{{ item.typeName }}</div>
        </div>
      </div>
      <div class="stock-table flex" v-if="pageIndex === 2">
        <div v-for="(item, index) in blockMapKeyList" :key="index">
          <div class="column">{{ item.typeName }}</div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="common-modal" v-if="addStockShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加股票</div>
        <div class="modal-content">
          <sjInput
            ref="myStockCode"
            :state="{ type: 'number', holder: '请输入股票代码' }"
            style="margin-bottom: 1.5rem;"
          />
          <sjInput
            ref="myStockName"
            :state="{ type: 'none', holder: '请输入股票名称' }"
            style="margin-bottom: 1.5rem;"
          />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="addStock">添加</div>
          <div class="common-btn tip" @click.stop="addStockShow = false">取消</div>
        </div>
      </div>
    </div>

    <!-- 全局导航 -->
    <indexEntry />
  </div>
</template>

<script>
import sjInput from "@/utils/sanJi-UI/sjInput.vue";
import indexEntry from "@/components/indexEntry/indexEntry.vue";
import {
  get_stockTypeMap,
  add_stock
} from "@/utils/lowDB/control/stockStoreApi.js";

export default {
  data() {
    return {
      pageIndex: 0,
      blockMap: {},
      blockMapKeyList: [],
      //
      nowAddStockType: "",
      addStockShow: false
    };
  },
  components: {
    indexEntry,
    sjInput
  },
  mounted() {
    this.blockMap = Object.assign({}, get_stockTypeMap());
  },
  methods: {
    addStock() {
      if (this.$refs.myStockCode.inputVerify()) return;
      if (this.$refs.myStockName.inputVerify()) return;
      let params = {
        code: this.$refs.myStockCode.inputValue,
        name: this.$refs.myStockName.inputValue,
        type: this.nowAddStockType
      };
      add_stock(params);
      this.addStockShow = false;
      this.$tip("添加成功");
    },
    setPageIndex(oldIndex, item) {
      if (oldIndex === 0) {
        this.pageIndex = 1;
        this.blockMapKeyList = Object.assign([], this.blockMap[item]);
      }
      if (oldIndex === 1) {
        this.pageIndex = 2;
        // this.blockMapKeyList = Object.assign([], this.blockMap[key]);
      }
    },
    updateMyStockStore() {
      this.$confirm(
        {
          title: "update all StockStore?",
          content: "将会耗费一定时间"
        },
        res => {
          if (res) {
            let ipc = require("electron").ipcRenderer;
            ipc.send("getStockById", { next: 123 });
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.stock {
  max-height: 100%;
  padding: 0.5rem;
  .stock-nav {
    margin-bottom: 0.5rem;
  }
  .stock-content {
    width: 85%;
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .stock-table {
      .column {
        width: 8rem;
        height: 8rem;
        line-height: 8rem;
        text-align: center;
        margin-right: 1rem;
        cursor: pointer;
        border: 1px solid $common-tip;
        &:hover {
          background-color: $common-white;
        }
      }
    }
  }
}
</style>
