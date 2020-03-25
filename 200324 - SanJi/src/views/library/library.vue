<template>
  <div class="library flex-y">
    <!-- 1.头部区块 -->
    <div class="library-nav flex-side">
      <div class="left">
        <div class="common-btn" v-for="(item, index) in blockList" :key="index" @click.stop="setNowBlockId(item)" :class="{'tip': nowBlockId===item.blockId}">{{ item.name }}</div>
        <div class="common-tip" v-show="!blockList.length">暂无数据</div>
      </div>
      <!-- 右侧按钮 -->
      <div class="right">
        <div class="common-btn" @click.stop="newBlockShow = true">+ 添加区块</div>
        <div class="common-btn" v-show="nowBlockId" @click.stop="newShelfShow = true">+ 添加书架</div>
        <div class="common-btn tip" @click.stop="toIndex">返回</div>
      </div>
    </div>
    <!-- 2.书架+内容 -->
    <div class="library-block flex">
      <div class="block-shelf">
        <div class="common-btn" v-for="(item, index) in shelfList" :key="index" @click.stop="setNowShelfId(item)" :class="{'tip': nowShelfId===item.shelfId}">{{ item.name }}</div>
        <div class="shelf-tip" v-show="!shelfList.length">暂无数据</div>
      </div>
      <div class="block-book"></div>
    </div>

    <!-- ************************************************* Modal ************************************************* -->
    <!-- * 新增区块 -->
    <div class="common-modal" v-show="newBlockShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加区块</div>
        <div class="modal-content">
          <commonInput ref="myBlock" :state="{ type:'none', holder:'请输入区块名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="createMyBlock">添加</div>
          <div class="common-btn tip" @click.stop="newBlockShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- * 新增书架 -->
    <div class="common-modal" v-show="newShelfShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加书架</div>
        <div class="modal-content">
          <commonInput ref="myShelf" :state="{ type:'none', holder:'请输入书架名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="createMyShelf">添加</div>
          <div class="common-btn tip" @click.stop="newShelfShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonInput from "@/ui/wqao-ui/common-input/common-input.vue";
import {
  createBlock,
  createShelf,
  getBlockList,
  getShelfList
} from "@/utils/lowDB/control/libraryAPI.js";

export default {
  data() {
    return {
      nowBlockId: "",
      nowShelfId: "",
      newBlockShow: false,
      newShelfShow: false,
      blockList: [],
      shelfList: []
    };
  },
  mounted() {
    this.getMyBlockList();
  },
  components: {
    commonInput
  },
  methods: {
    // ** 区块
    getMyBlockList() {
      let list = getBlockList();
      this.blockList = Object.assign([], list);
      // this.$test.log("取得区块列表", list);
    },
    createMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      createBlock(blockName);
      this.getMyBlockList();
      window.alert("添加成功");
      this.newBlockShow = false;
    },
    setNowBlockId(item) {
      this.nowBlockId = item.blockId;
      this.getMyShelfList();
    },
    // ** 书架
    getMyShelfList() {
      let list = getShelfList(this.nowBlockId);
      this.shelfList = Object.assign([], list);
      // this.$test.log("取得书架列表", list);
      console.log("取得书架列表", list);
    },
    createMyShelf() {
      let blockId = this.nowBlockId;
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      createShelf(blockId, shelfName);
      this.getMyShelfList();
      window.alert("添加成功");
      this.newShelfShow = false;
    },
    setNowShelfId(item) {
      this.nowShelfId = item.shelfId;
    },
    // ** 全局
    toIndex() {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/library.scss";
</style>
