<template>
  <div class="library flex-y">
    <!-- 1.头部区块 -->
    <div class="library-nav flex-side">
      <!-- 左侧区块列表 -->
      <div class="left">
        <div
          class="common-btn tip"
          v-for="(item, index) in blockList"
          :key="index"
          @click.stop="setNowBlockId(item)"
          :class="{'tip-on': nowBlockId===item.blockId}"
        >{{ item.name }}</div>
        <div class="nav-tip" v-show="!blockList.length">暂无数据</div>
      </div>
      <!-- 右侧按钮 -->
      <div class="right flex-x-reverse">
        <div class="common-btn tip" @click.stop="toIndex">返回</div>
        <div class="common-btn" v-show="nowBlockId" @click.stop="deleteMyBlock">删除区块</div>
        <div class="common-btn tip" v-show="nowBlockId" @click.stop="editBlockShow = true">修改名称</div>
        <div class="common-btn" @click.stop="newBlockShow = true">+ 添加区块</div>
      </div>
    </div>

    <!-- 2.书架+内容 -->
    <div class="library-block flex">
      <div class="shelf-block flex-y">
        <!-- 书架 -->
        <div class="shelf flex-y" v-for="(item, index) in shelfList" :key="index">
          <div
            class="common-btn blue"
            @click.stop="setNowShelfId(item)"
            :class="{'blue-on': nowShelfId===item.shelfId}"
          >{{ item.name }}</div>
          <div class="books" v-show="nowShelfId === item.shelfId">
            <div
              class="common-btn orange"
              v-for="(book, index) in item.books"
              :key="index"
              :class="{'orange-on': nowBookId === book.bookId}"
              @click.stop="setNowBookId(book)"
            >{{ book.name }}</div>
            <div style="text-align: center;" v-show="!item.books.length">暂无书籍</div>
            <div class="book-admin flex-no-side">
              <div class="common-btn orange-on" @click.stop="newBookShow = true">添加书籍</div>
              <div class="common-btn red" v-show="nowBookId" @click.stop="deleteMyBook">删除书籍</div>
              <div class="common-btn" v-show="nowBookId" @click.stop="editBookShow = true">编辑书籍</div>
            </div>
          </div>
        </div>
        <div class="shelf-tip" v-show="!shelfList.length">暂无数据</div>
        <!-- 书架管理 -->
        <div class="shelf-admin flex-no-side">
          <div class="common-btn blue-on" v-show="nowBlockId" @click.stop="newShelfShow = true">添加书架</div>
          <div class="common-btn red" v-show="nowShelfId" @click.stop="deleteMyShelf">删除书架</div>
          <div class="common-btn" v-show="nowShelfId" @click.stop="editShelfShow = true">修改书架</div>
        </div>
      </div>

      <!-- 书籍内容 -->
      <div class="block-book">
        <div v-show="nowBookId" class="flex-y">
          <div class="book-nav">
            <div class="common-btn" @click.stop="getMyRichText">保存</div>
          </div>
          <div class="book">
            <richText ref="myRichText" :content="nowBookContent" />
          </div>
        </div>
      </div>
    </div>

    <!-- ************************************************* Modal ************************************************* -->
    <!-- * 新增区块 -->
    <div class="common-modal" v-if="newBlockShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加区块</div>
        <div class="modal-content">
          <commonInput
            ref="myBlock"
            :state="{ type:'none', holder:'请输入区块名称' }"
            style="margin-top: 1rem;"
          />
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
          <commonInput
            ref="myBlock"
            :state="{ type:'none', holder:'请输入新区块名称' }"
            style="margin-top: 1rem;"
          />
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
          <commonInput
            ref="myShelf"
            :state="{ type:'none', holder:'请输入书架名称' }"
            style="margin-top: 1rem;"
          />
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
          <commonInput
            ref="myShelf"
            :state="{ type:'none', holder:'请输入新书架名称' }"
            style="margin-top: 1rem;"
          />
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
          <commonInput
            ref="myBook"
            :state="{ type:'none', holder:'请输入书籍名称' }"
            style="margin-top: 1rem;"
          />
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
          <commonInput
            ref="myBook"
            :state="{ type:'none', holder:'请输入新书名称' }"
            style="margin-top: 1rem;"
          />
        </div>
        <div class="modal-btns">
          <div class="common-btn" @click.stop="editMyBookName">修改</div>
          <div class="common-btn tip" @click.stop="editBookShow = false">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      editBookShow: false
    };
  },
  mounted() {
    this.getMyBlockList();
  },
  components: {
    commonInput,
    richText
  },
  methods: {
    // ************************************************ 区块
    createMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      createBlock(blockName);
      this.getMyBlockList();
      // window.alert("添加成功");
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
    deleteMyBlock() {
      // let response = window.confirm(
      //   "您正在删除这个区块，及其书架/书籍，确认要这么做吗？"
      // );
      // if (!response) return;
      // let responseAgain = window.confirm(
      //   "您真的要删除这个区块及其书架/书籍吗？"
      // );
      // if (response && responseAgain) {
      removeBlock(this.nowBlockId);
      this.clearLibrary();
      this.getMyBlockList();
      // }
    },
    // ************************************************ 书架
    createMyShelf() {
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      createShelf(this.nowBlockId, shelfName);
      this.getMyShelfList();
      // window.alert("添加成功");
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
    deleteMyShelf() {
      // let response = window.confirm(
      //   "您正在删除这个书架，及其书籍，确认要这么做吗？"
      // );
      // if (!response) return;
      // let responseAgain = window.confirm("您真的要删除这个书架及其书籍吗？");
      // if (response && responseAgain) {
      removeShelf(this.nowShelfId);
      this.nowShelfId = "";
      this.getMyShelfList();
      // }
    },
    // ************************************************ 3.书籍
    createMyBook() {
      if (this.$refs.myBook.inputVerify()) return;
      let bookName = this.$refs.myBook.inputValue;
      console.log(this.nowBlockId, this.nowShelfId, bookName, "");
      createBook(this.nowBlockId, this.nowShelfId, bookName, "");
      this.getMyShelfList();
      // window.alert("添加成功");
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
    deleteMyBook() {
      // let response = window.confirm("您正在删除这个书籍，确认要这么做吗？");
      // if (response) {
      removeBook(this.nowBookId);
      this.nowBookId = "";
      this.getMyShelfList();
      // }
    },
    // 取得富文本内容 并且保存
    getMyRichText() {
      let content = this.$refs.myRichText.getContent();
      setBookContent(this.nowBookId, content);
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/library.scss";
</style>
