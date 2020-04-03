<template>
  <div class="library flex-y">
    <!-- 1.头部区块 -->
    <div class="library-nav flex-side">
      <!-- 左侧区块列表 -->
      <div class="left">
        <div class="common-btn tip" v-for="(item, index) in blockList" :key="index" @click.stop="setNowBlockId(item)" :class="{'tip-on': nowBlockId===item.blockId}">{{ item.name }}</div>
        <div class="nav-tip" v-show="!blockList.length">暂无数据</div>
      </div>
      <!-- 右侧按钮 -->
      <div class="right flex-x-reverse">
        <div class="common-btn tip" @click.stop="toIndex">返回</div>
        <div class="common-btn red" v-show="nowBlockId" @click.stop="modalToConfirm('block')">删除区块</div>
        <div class="common-btn" v-show="nowBlockId" @click.stop="editBlockShow = true">修改名称</div>
        <div class="common-btn" @click.stop="newBlockShow = true">+ 添加区块</div>
      </div>
    </div>

    <!-- 2.书架+内容 -->
    <div class="library-block flex">
      <div class="shelf-block flex-y">
        <!-- 书架 -->
        <div class="shelfs">
          <div class="shelf flex-y" v-for="(item, index) in shelfList" :key="index">
            <div class="common-btn blue" @click.stop="setNowShelfId(item)" :class="{'blue-on': nowShelfId===item.shelfId}">{{ item.name }}</div>
            <div class="books" v-show="nowShelfId === item.shelfId">
              <div class="common-btn orange" v-for="(book, index) in item.books" :key="index" :class="{'orange-on': nowBookId === book.bookId}" @click.stop="setNowBookId(book)">{{ book.name }}</div>
              <div style="text-align: center; margin-top: 2rem;" v-show="!item.books.length">暂无书籍</div>
              <div class="book-admin flex-no-side">
                <div class="common-btn orange-on" @click.stop="newBookShow = true">添加书籍</div>
                <div class="common-btn red" v-show="nowBookId" @click.stop="modalToConfirm('book')">删除书籍</div>
                <div class="common-btn" v-show="nowBookId" @click.stop="editBookShow = true">编辑书籍</div>
              </div>
            </div>
          </div>
        </div>
        <div class="shelf-tip" v-show="!shelfList.length">暂无数据</div>
        <!-- 书架管理 -->
        <div class="shelf-admin flex-no-side">
          <div class="common-btn blue-on" v-show="nowBlockId" @click.stop="newShelfShow = true">添加书架</div>
          <div class="common-btn red" v-show="nowShelfId" @click.stop="modalToConfirm('shelf')">删除书架</div>
          <div class="common-btn" v-show="nowShelfId" @click.stop="editShelfShow = true">修改书架</div>
        </div>
      </div>

      <!-- 书籍内容 -->
      <div class="block-book" v-show="nowBookId">
        <div class="book-nav">
          <div class="common-btn" @click.stop="getMyRichText">保存</div>
        </div>
        <div class="book">
          <richText ref="myRichText" :content="nowBookContent" />
        </div>
      </div>
    </div>

    <!-- ************************************************* Modal ************************************************* -->
    <!-- * 新增区块 -->
    <div class="common-modal" v-if="newBlockShow">
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
    <!-- * 编辑区块 -->
    <div class="common-modal" v-if="editBlockShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">编辑区块</div>
        <div class="modal-content">
          <commonInput ref="myBlock" :state="{ type:'none', holder:'请输入新区块名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="editMyBlock">修改</div>
          <div class="common-btn tip" @click.stop="editBlockShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- * 新增书架 -->
    <div class="common-modal" v-if="newShelfShow">
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
    <!-- * 编辑书架 -->
    <div class="common-modal" v-if="editShelfShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加书架</div>
        <div class="modal-content">
          <commonInput ref="myShelf" :state="{ type:'none', holder:'请输入新书架名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="editMyShelf">修改</div>
          <div class="common-btn tip" @click.stop="editShelfShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- * 新增书籍 -->
    <div class="common-modal" v-if="newBookShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加书籍</div>
        <div class="modal-content">
          <commonInput ref="myBook" :state="{ type:'none', holder:'请输入书籍名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="createMyBook">添加</div>
          <div class="common-btn tip" @click.stop="newBookShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- * 编辑书籍 -->
    <div class="common-modal" v-if="editBookShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">编辑书籍</div>
        <div class="modal-content">
          <commonInput ref="myBook" :state="{ type:'none', holder:'请输入新书名称' }" style="margin-top: 1rem;" />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="editMyBookName">修改</div>
          <div class="common-btn tip" @click.stop="editBookShow = false">取消</div>
        </div>
      </div>
    </div>
    <!-- * 通用警告 -->
    <WqaoModal :show="warnModal" title="提示" :content="warnModalContent" @action="warnModal = false" />
    <WqaoModal :show="bookConfirmShow" title="提示" content="确定要这么做吗_(xз」∠)_？" @action="bookConfirm" />
    <WqaoModal :show="shelfConfirmShow" title="提示" content="确定要这么做吗_(xз」∠)_？" @action="shelfConfirm" />
    <WqaoModal :show="blockConfirmShow" title="提示" content="确定要这么做吗_(xз」∠)_？" @action="blockConfirm" />
  </div>
</template>

<script>
import WqaoModal from "@/utils/Wqao/wqao-modal/wqao-modal.vue";
import commonInput from "@/ui/wqao-ui/common-input/common-input.vue";
import richText from "@/utils/Wqao/richText/richText";
import {
  createBlock,
  getBlockList,
  editBlockName,
  removeBlock,
  createShelf,
  getShelfList,
  editShelfName,
  removeShelf,
  createBook,
  editBookName,
  removeBook,
  getBookContent,
  setBookContent
} from "@/utils/lowDB/control/libraryAPI.js";

export default {
  data() {
    return {
      // 选中区块
      blockList: [],
      nowBlockId: "",
      newBlockShow: false,
      editBlockShow: false,
      // 选中书架
      shelfList: [],
      nowShelfId: "",
      newShelfShow: false,
      editShelfShow: false,
      // 选中书籍
      nowBookId: "",
      nowBookContent: "",
      newBookShow: false,
      editBookShow: false,
      // 通用警告
      warnModal: false,
      warnModalContent: "",
      // 确认警告
      bookConfirmShow: false,
      shelfConfirmShow: false,
      blockConfirmShow: false
    };
  },
  mounted() {
    this.getMyBlockList();
  },
  components: {
    commonInput,
    richText,
    WqaoModal
  },
  methods: {
    // ************************************************ 区块
    createMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      createBlock(blockName);
      this.getMyBlockList();
      this.modalToWarn("添加成功");
      this.newBlockShow = false;
    },
    editMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      editBlockName(this.nowBlockId, blockName);
      this.getMyBlockList();
      this.editBlockShow = false;
    },
    getMyBlockList() {
      let list = getBlockList();
      this.blockList = Object.assign([], list);
      // this.$test.log("取得区块列表", list);
    },
    setNowBlockId(item) {
      this.clearLibrary();
      this.nowBlockId = item.blockId;
      this.getMyShelfList();
    },
    blockConfirm(bool) {
      this.blockConfirmShow = false;
      if (bool) this.deleteMyBlock();
    },
    deleteMyBlock() {
      removeBlock(this.nowBlockId);
      this.clearLibrary();
      this.getMyBlockList();
    },
    // ************************************************ 书架
    createMyShelf() {
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      createShelf(this.nowBlockId, shelfName);
      this.getMyShelfList();
      this.modalToWarn("添加成功");
      this.newShelfShow = false;
    },
    editMyShelf() {
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      editShelfName(this.nowShelfId, shelfName);
      this.getMyShelfList();
      this.editShelfShow = false;
    },
    getMyShelfList() {
      let list = getShelfList(this.nowBlockId);
      this.shelfList = Object.assign([], list);
      console.log("取得书架列表", list);
    },
    setNowShelfId(item) {
      this.nowBookId = "";
      this.nowShelfId = item.shelfId;
    },
    shelfConfirm(bool) {
      this.shelfConfirmShow = false;
      if (bool) this.deleteMyShelf();
    },
    deleteMyShelf() {
      removeShelf(this.nowShelfId);
      this.nowShelfId = "";
      this.getMyShelfList();
    },
    // ************************************************ 3.书籍
    createMyBook() {
      if (this.$refs.myBook.inputVerify()) return;
      let bookName = this.$refs.myBook.inputValue;
      createBook(this.nowBlockId, this.nowShelfId, bookName, "");
      this.getMyShelfList();
      this.modalToWarn("添加成功");
      this.newBookShow = false;
    },
    editMyBookName() {
      if (this.$refs.myBook.inputVerify()) return;
      let bookName = this.$refs.myBook.inputValue;
      editBookName(this.nowBookId, bookName);
      this.getMyShelfList();
      this.editBookShow = false;
    },
    setNowBookId(item) {
      this.nowBookId = item.bookId;
      let content = getBookContent(item.bookId);
      this.nowBookContent = content;
    },
    bookConfirm(bool) {
      this.bookConfirmShow = false;
      if (bool) this.deleteMyBook();
    },
    deleteMyBook() {
      removeBook(this.nowBookId);
      this.nowBookId = "";
      this.getMyShelfList();
    },
    // 取得富文本内容 并且保存
    getMyRichText() {
      let content = this.$refs.myRichText.getContent();
      setBookContent(this.nowBookId, content);
      this.modalToWarn("保存成功");
    },
    // ************************************************ 全局
    clearLibrary() {
      this.nowBlockId = "";
      this.nowShelfId = "";
      this.nowBookId = "";
      this.nowBookContent = "";
    },
    toIndex() {
      this.$router.push({ name: "index" });
    },
    modalToWarn(content) {
      this.warnModal = true;
      this.warnModalContent = content;
    },
    modalToConfirm(key) {
      if (key === "book") this.bookConfirmShow = true;
      if (key === "shelf") this.shelfConfirmShow = true;
      if (key === "block") this.blockConfirmShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/library.scss";
</style>
