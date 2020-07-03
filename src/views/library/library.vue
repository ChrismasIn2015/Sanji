<template>
  <div class="library flex-y">
    <!-- 1.头部区块 -->
    <div class="library-nav flex-side">
      <!-- 左侧区块列表 -->
      <div class="left flex">
        <div
          class="common-btn tip"
          v-for="(item, index) in blockList"
          :key="index"
          @click.stop="setNowBlockId(item)"
          :class="{ 'tip-on': nowBlockId === item.blockId }"
        >
          <span
            class="pot"
            v-show="nowBlockId === item.blockId"
            @click.stop="modalToConfirm('block')"
          >✖</span>
          <span
            class="pot pot-edit"
            v-show="nowBlockId === item.blockId"
            @click.stop="editBlockShow = true"
          >··</span>
          <span>{{ item.name }}</span>
        </div>
        <div class="common-btn" @click.stop="newBlockShow = true">+</div>
        <div class="nav-tip" v-show="!blockList.length">暂无数据</div>
      </div>
    </div>

    <!-- 2.书架+内容 -->
    <div class="library-block flex">
      <div class="shelf-block flex-y">
        <!-- 书架 -->
        <div class="shelfs">
          <div class="shelf" v-for="(item, index) in shelfList" :key="index">
            <div
              class="common-btn blue-on"
              @click.stop="setNowShelfId(item)"
              :class="{ blue: nowShelfId === item.shelfId }"
            >
              <span
                class="pot"
                v-show="nowShelfId === item.shelfId"
                @click.stop="modalToConfirm('shelf')"
              >✖</span>
              <span
                class="pot pot-edit"
                v-show="nowShelfId === item.shelfId"
                @click.stop="editShelfShow = true"
              >..</span>
              <span>{{ item.name }}（{{ item.books.length }}）</span>
            </div>

            <!-- 3.书籍列表 -->
            <div class="books flex-wrap" v-show="nowShelfId === item.shelfId">
              <div
                class="common-btn orange-on"
                v-for="(book, index) in item.books"
                :key="index"
                :class="{
                  orange: nowBookId === book.bookId,
                }"
                @click.stop="setNowBookId(book)"
              >
                <span
                  class="pot"
                  v-show="nowBookId === book.bookId"
                  @click.stop="modalToConfirm('book')"
                >✖</span>
                <span
                  class="pot pot-edit"
                  v-show="nowBookId === book.bookId"
                  @click.stop="editBookShow = true"
                >··</span>
                <span>{{ book.name }}</span>
              </div>
              <div class="common-btn orange" @click.stop="newBookShow = true">+</div>
              <div class="common-btn disable" v-show="!item.books.length">暂无书籍</div>
              <div class="book-admin flex-no-side"></div>
            </div>
          </div>
          <div class="shelf" v-show="nowBlockId">
            <div class="common-btn blue" @click.stop="newShelfShow = true">+ 添加书架</div>
          </div>
        </div>
        <div class="shelf-tip" v-show="!shelfList.length">暂无数据</div>
      </div>

      <!-- 书籍内容 -->
      <div class="block-book" v-show="nowBookId">
        <div class="book">
          <richText ref="myRichText" :content="nowBookContent" @saveAction="getMyRichText" />
        </div>
      </div>
    </div>

    <!-- 右侧导航 -->
    <indexEntry />
    <!-- ************************************************* Modal ************************************************* -->
    <!-- * 新增区块 -->
    <div class="common-modal" v-if="newBlockShow">
      <div class="common-modal-blank" style=" max-width: 30rem;">
        <div class="modal-title">添加区块</div>
        <div class="modal-content">
          <sjInput
            ref="myBlock"
            :state="{ type: 'none', holder: '请输入区块名称' }"
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
          <sjInput
            ref="myBlock"
            :state="{ type: 'none', holder: '请输入新区块名称' }"
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
          <sjInput
            ref="myShelf"
            :state="{ type: 'none', holder: '请输入书架名称' }"
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
        <div class="modal-title">编辑书架</div>
        <div class="modal-content">
          <sjInput
            ref="myShelf"
            :state="{ type: 'none', holder: '请输入新书架名称' }"
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
          <sjInput
            ref="myBook"
            :state="{ type: 'none', holder: '请输入书籍名称' }"
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
          <sjInput
            ref="myBook"
            :state="{ type: 'none', holder: '请输入新书名称' }"
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
import indexEntry from "@/components/indexEntry/indexEntry.vue";
import sjInput from "@/utils/sanJi-UI/sjInput.vue";
import richText from "./components/richText";
import {
  block_create,
  getBlockList,
  block_editName,
  block_remove,
  shelf_create,
  getShelfList,
  shelf_editName,
  shelf_remove,
  book_create,
  book_editName,
  book_remove,
  book_getContent,
  book_setContent
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
    sjInput,
    richText,
    indexEntry
  },
  methods: {
    // ************************************************ 区块
    createMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      block_create(blockName);
      this.getMyBlockList();
      this.$tip("添加成功");
      this.newBlockShow = false;
    },
    editMyBlock() {
      if (this.$refs.myBlock.inputVerify()) return;
      let blockName = this.$refs.myBlock.inputValue;
      block_editName(this.nowBlockId, blockName);
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
      block_remove(this.nowBlockId);
      this.clearLibrary();
      this.getMyBlockList();
      this.shelfList = [];
    },
    // ************************************************ 书架
    createMyShelf() {
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      shelf_create(this.nowBlockId, shelfName);
      this.getMyShelfList();
      this.$tip("添加成功");
      this.newShelfShow = false;
    },
    editMyShelf() {
      if (this.$refs.myShelf.inputVerify()) return;
      let shelfName = this.$refs.myShelf.inputValue;
      shelf_editName(this.nowShelfId, shelfName);
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
      shelf_remove(this.nowShelfId);
      this.nowShelfId = "";
      this.getMyShelfList();
    },
    // ************************************************ 3.书籍
    createMyBook() {
      if (this.$refs.myBook.inputVerify()) return;
      let bookName = this.$refs.myBook.inputValue;
      book_create(this.nowBlockId, this.nowShelfId, bookName, "");
      this.getMyShelfList();
      this.$tip("添加成功");
      this.newBookShow = false;
    },
    editMyBookName() {
      if (this.$refs.myBook.inputVerify()) return;
      let bookName = this.$refs.myBook.inputValue;
      book_editName(this.nowBookId, bookName);
      this.getMyShelfList();
      this.editBookShow = false;
    },
    setNowBookId(item) {
      this.nowBookId = item.bookId;
      let content = book_getContent(item.bookId);
      this.nowBookContent = content;
    },
    deleteMyBook() {
      book_remove(this.nowBookId);
      this.nowBookId = "";
      this.getMyShelfList();
    },
    // 取得富文本内容 并且保存
    getMyRichText(data) {
      book_setContent(this.nowBookId, data);
      this.$tip("保存成功");
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
    modalToConfirm(key) {
      let option = {
        title: "确认",
        content: "确认要删除吗"
      };
      if (key === "book")
        this.$confirm(option, res => {
          if (res) {
            this.deleteMyBook();
            this.$tip("删除成功");
          }
        });
      if (key === "shelf")
        this.$confirm(option, res => {
          if (res) {
            this.deleteMyShelf();
            this.$tip("删除成功");
          }
        });
      if (key === "block")
        this.$confirm(option, res => {
          if (res) {
            this.deleteMyBlock();
            this.$tip("删除成功");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/library.scss";
</style>
