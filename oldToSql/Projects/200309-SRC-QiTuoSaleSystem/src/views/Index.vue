<template>
  <div class="index">
    <!-- 标题 -->
    <div class="index-nav">
      <div class="title">奇拓金属-库存管理</div>
    </div>
    <!-- 功能区 -->
    <div class="index-ribbon flex-side">
      <div class="left-btns">
        <div class="common-btn" @click.self="steelInShow">钢材入库</div>
      </div>
      <div class="right-btns">
        <div class="common-btn" @click.self="toLog">入/出库记录</div>
        <!-- <div class="common-btn">卷转板</div> -->
      </div>
    </div>
    <!-- 表格 -->
    <div class="index-table">
      <div class="row">
        <div class="column">单选</div>
        <div class="column">分类</div>
        <div class="column">名称</div>
        <div class="column">长度/厘米</div>
        <div class="column">宽度/厘米</div>
        <div class="column">厚度/厘米</div>
        <div class="column">数量/张</div>
        <div class="column">重量/吨</div>
        <div class="column">成本/元</div>
        <div class="column">操作</div>
      </div>
      <div
        class="row"
        v-for="(value, key, index) in inventoryMap"
        :key="index"
        :class="{'row-on': value.checked}"
        @click.stop="singleCheck(key)"
      >
        <div class="column">
          <div class="check-box" :class="{'check-box-on': value.checked}"></div>
        </div>
        <div class="column">{{value.steelType === 0 ? "板" : "卷"}}</div>
        <div class="column">{{value.steelName}}</div>
        <div class="column">{{value.steelLength}}</div>
        <div class="column">{{value.steelWidth}}</div>
        <div class="column">{{value.steelHeight}}</div>
        <div class="column">{{value.count}}</div>
        <div class="column">{{value.weight}}</div>
        <div class="column">{{value.price}}</div>
        <div class="column">
          <div class="common-link" @click.stop="steelOutShow(key, value)">出库</div>
          <div class="common-link" @click.stop="steelDelete(key)">删除</div>
        </div>
      </div>
    </div>
    <!-- 入库 modal -->
    <editSteel ref="mySteelNew" v-show="editSteelShow" :isOut="isSteelOut" />
  </div>
</template>

<script>
import editSteel from "@/components/editSteel";
export default {
  data() {
    return {
      // 库存
      inventoryMap: {},
      // 入库相关
      editSteelShow: false,
      editSteelType: 0, // 0 板 1 卷
      // 出库相关
      isSteelOut: false
    };
  },
  components: {
    editSteel
  },
  mounted() {
    this.getMySteelMap();
  },
  methods: {
    // 入库相关 **************************************
    steelInShow() {
      this.$refs.mySteelNew.initSteel();
      this.isSteelOut = false;
      this.editSteelShow = true;
    },
    steelIn() {
      let newSteel = this.$refs.mySteelNew.getSteel();
      this.$SteelDB.steelAdd(newSteel);
      // 渲染
      this.getMySteelMap();
      this.editSteelShow = false;
    },
    // 出库相关 **************************************
    steelOutShow(id, value) {
      this.isSteelOut = true;
      this.$refs.mySteelNew.initSteel(value, id);
      this.editSteelShow = true;
    },
    steelOut() {
      let mySteel = this.$refs.mySteelNew.getSteel();
      let id = this.$refs.mySteelNew.getTempId();
      this.$SteelDB.steelSale(id, mySteel);
      // // 渲染
      this.getMySteelMap();
      this.editSteelShow = false;
    },
    // **************************************
    closeSteelModal() {
      this.editSteelShow = false;
    },
    steelDelete(key) {
      this.$SteelDB.steelDelete(key);
    },
    getMySteelMap() {
      let map = this.$SteelDB.getSteelMap();
      for (let key in map) {
        map[key]["checked"] = false;
      }
      this.inventoryMap = Object.assign({}, map);
    },
    toLog() {
      this.$router.push({ name: "steelLog" });
    },
    singleCheck(key) {
      for (let tempKey in this.inventoryMap) {
        this.inventoryMap[tempKey].checked = false;
      }
      this.inventoryMap[key].checked = true;
    }

    // 检测
    // let hasChecked = false;
    // for (let key in this.inventoryMap) {
    //   if (this.inventoryMap[key].checked) hasChecked = true;
    // }
    // if (!hasChecked) {
    //   window.alert("请至少选择一项库存");
    //   return;
    // }
    //
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
        display: flex;
        align-items: center;
        white-space: wrap;
        .check-box {
          width: 1rem;
          height: 1rem;
          border: 1px solid $common-main;
        }
        .check-box-on {
          background-color: $common-main;
        }
        .common-link {
          margin-right: 1rem;
        }
      }
    }
    .row-on {
      background-color: $common-tip-lower;
    }
  }
}
</style>
