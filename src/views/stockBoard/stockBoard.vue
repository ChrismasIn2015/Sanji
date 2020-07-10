<template>
  <div class="stock">
    <div class="stock-nav flex">
      <div class="common-btn" @click.stop="updateMyStockStore">更新</div>
    </div>
    <div class="stock-table"></div>

    <!-- 全局导航 -->
    <indexEntry />
  </div>
</template>

<script>
import indexEntry from "@/components/indexEntry/indexEntry.vue";
export default {
  data() {
    return {};
  },
  components: {
    indexEntry
  },
  methods: {
    updateMyStockStore() {
      this.$confirm(
        { title: "update all StockStore?", content: "将会耗费一定时间" },
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
  padding: 0.5rem;
}
</style>
