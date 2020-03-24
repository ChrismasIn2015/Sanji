<template>
  <div
    class="library"
    @click="clearMenus"
    @contextmenu.prevent.stop="libraryMenu_show($event, null, 'library')"
  >
    <!-- Shelfs -->
    <div class="library-shelfs text-cut" v-for="(shelf, index) in shelfs" :key="index">
      <!-- Shelf-Title -->
      <div class="shelf-title">
        <div
          class="title"
          @click="books_show(shelf)"
          @contextmenu.prevent.stop="libraryMenu_show($event, shelf, 'shelf-title')"
          :style="{ 'background-color' : shelf.shelfShow ? '#33cc66' : '' }"
        >{{ shelf.name }}</div>
        <!-- <div class="menu" v-show="shelf.shelfShow">新增列</div>
        <div class="menu" v-show="shelf.shelfShow">新增行</div>
        <div class="menu" v-show="shelf.shelfShow">新增Book</div>-->
      </div>
      <!-- Shelf-Cloumns -->
      <div class="style-books" v-show="shelf.shelfShow">
        <div
          class="shelf-column"
          v-for="(cloumn, index) in shelf.cloumns"
          :key="index"
          :style="{'height': (cloumn.length*70) + 140}"
          @contextmenu.prevent.stop="libraryMenu_show($event, shelf.cloumns, 'shelf')"
        >
          <!-- Shelf-Cloumns-Book -->
          <div
            class="book text-cut"
            v-for="(book, _index) in cloumn"
            :key="_index"
            :style="{'top': book.top}"
            @mousedown.prevent="bookDrag($event, book)"
            @mouseleave.prevent="clearDrag"
            @contextmenu.prevent.stop="libraryMenu_show($event, cloumn, 'book')"
          >({{_index }}){{ " " + book.bookName }}</div>
        </div>
      </div>
    </div>

    <!-- Global LibraryMenu -->
    <div
      class="library-menu"
      v-show="style_libraryMenu.show"
      :style="style_libraryMenu_postion"
      @click.stop
    >
      <div
        class="menu"
        v-show="style_libraryMenu.type === 'library'"
        @click="libraryModal_show('shelf-add')"
      >新建书架</div>
      <div
        class="menu"
        v-show="style_libraryMenu.type === 'shelf-title'"
        @click="libraryModal_show('shelf-rename')"
      >重命名Shelf</div>
      <div class="menu" v-show="style_libraryMenu.type === 'shelf-title'" @click="shelf_remove">删除书架</div>
      <div
        class="menu"
        v-show="style_libraryMenu.type === 'book'"
        @click="libraryModal_show('book-add')"
      >新建同级Book</div>
      <div
        class="menu"
        v-show="style_libraryMenu.type === 'shelf'"
        @click="libraryModal_show('book-next-add')"
      >新建下级Book</div>
      <div class="menu" v-show="style_libraryMenu.type === 'book'">重命名Book</div>
      <div class="menu" v-show="style_libraryMenu.type === 'book'">删除书籍</div>
    </div>

    <!-- Global Modal -->
    <div class="library-modal" v-show="style_libraryModal.show" @click.stop>
      <input class="modal-input" v-model="style_libraryModal.name" placeholder="请输入名称" />
      <div
        class="modal-btn"
        v-show="style_libraryModal.type === 'shelf-add'"
        @click="shelf_add"
      >新建Shelf</div>
      <div
        class="modal-btn"
        v-show="style_libraryModal.type === 'shelf-rename'"
        @click="shelf_rename"
      >重命名Shelf</div>
      <div
        class="modal-btn"
        v-show="style_libraryModal.type === 'book-next-add'"
        @click="book_nextAdd"
      >新建下级Book</div>
      <div
        class="modal-btn"
        v-show="style_libraryModal.type === 'book-add'"
        @click="book_add"
      >新建同级Book</div>
      <div class="modal-btn" @click="clearMenus">取消</div>
    </div>

    <!-- Global Save -->
    <div class="library-save">保存数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      shelfs: [
        {
          name: "No Name",
          shelfShow: false,
          cloumns: [[{ bookName: "No Nameaaaaaaaaaaaa", top: 0 }]]
        }
      ],
      tempPointer: null,
      //
      style_libraryModal: {
        show: false,
        name: "",
        type: "", // shelf/book-add 添加 shelf/book-rename 修改
        shelf_pointer: null
      },
      style_libraryMenu: {
        show: false,
        top: 0,
        left: 0,
        type: "",
        shelf_pointer: null
      }
    };
  },
  created() {
    // document.onmousemove = () => {
    //   console.log(event);
    // };
  },
  computed: {
    style_libraryMenu_postion() {
      return {
        top: this.style_libraryMenu.top,
        left: this.style_libraryMenu.left
      };
    }
  },
  methods: {
    // drag
    bookDrag(e0, book) {
      let targetConst = e0.layerY;
      let targetTopMax =
        e0.target.parentElement.offsetHeight - e0.target.offsetHeight;
      // 相对父元素距离 = var(鼠标-页面) - const(鼠标-book) - const(book父元素 - 页面)
      document.onmousemove = e1 => {
        let moveTop =
          e1.pageY - targetConst - e1.target.parentElement.offsetTop;
        if (moveTop >= 0 && moveTop <= targetTopMax) book.top = moveTop;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    },
    clearDrag() {
      document.onmousemove = null;
    },
    // shelfs, books
    books_show(shelf) {
      shelf.shelfShow = !shelf.shelfShow;
    },
    shelf_add() {
      // 1.不允许为空
      if (!this.style_libraryModal.name) {
        window.alert("不能为空");
        return;
      }
      // 2.不允许重名
      let renameCheck = false;
      for (let i = 0; i < this.shelfs.length; i++) {
        if (this.shelfs[i].name === this.style_libraryModal.name) {
          window.alert("该书架已存在");
          return;
        }
      }
      //
      this.shelfs.push({
        name: this.style_libraryModal.name,
        shelfShow: false,
        cloumns: [[{ bookName: "No Name", top: 0 }]]
      });
      this.clearMenus();
    },
    shelf_remove() {
      let tempArr = JSON.parse(JSON.stringify(this.shelfs));
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].name === this.tempPointer.name) {
          tempArr.splice(i, 1);
          break; // 只删除从上到下 第一个满足条件的Shelf
        }
      }
      this.shelfs = Object.assign([], tempArr);
      this.clearMenus();
    },
    shelf_rename() {
      this.tempPointer.name = this.style_libraryModal.name;
      this.shelfs = Object.assign([], this.shelfs);
      this.clearMenus();
    },
    book_add() {
      // 1.不允许为空
      if (!this.style_libraryModal.name) {
        window.alert("不能为空");
        return;
      }
      //
      this.tempPointer.push({ bookName: "No Name", top: 0 });
      this.clearMenus();
    },
    book_nextAdd() {
      // 1.不允许为空
      if (!this.style_libraryModal.name) {
        window.alert("不能为空");
        return;
      }
      //
      this.tempPointer.push([{ bookName: "No Name", top: 0 }]);
      this.clearMenus();
    },
    // menu, modal
    libraryMenu_show(event, item, type) {
      this.clearMenus();
      this.style_libraryMenu.top = event.pageY;
      this.style_libraryMenu.left = event.pageX;
      this.tempPointer = item ? item : null;
      console.log("1.菜单展示", this.tempPointer);
      this.style_libraryMenu.type = type; // book 书籍右键 shelf 书架右键 library 全局右键
      this.style_libraryMenu.show = true;
    },
    libraryModal_show(type) {
      console.log("2.弹窗展示", this.tempPointer);
      this.style_libraryMenu.show = false;
      this.style_libraryModal.type = type;
      this.style_libraryModal.show = true;
    },
    clearMenus() {
      this.tempPointer = null;
      this.style_libraryMenu.show = false;
      this.style_libraryModal.name = "";
      this.style_libraryModal.type = "";
      this.style_libraryModal.show = false;
      console.log("*.清空！！", this.tempPointer);
    }
  }
};
</script>

<style lang="scss" scoped>
.library {
  min-height: 100%;
  background-color: #ffffcc;
  padding: 5px;
  //
  .library-shelfs {
    margin-bottom: 5px;
    .shelf-title {
      display: flex;
      .title {
        min-width: 100px;
        height: 60px;
        padding: 0px 5px;
        background-color: #336690;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background-color: #33cc66;
        }
      }
      .menu {
        width: 100px;
        height: 60px;
        background-color: #b193b8;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background-color: #33cc66;
        }
      }
    }
    .style-books {
      // border: 2px solid red;
      background-color: red;
      margin: 5px 0px;
      display: inline-flex;
      .shelf-column {
        width: 180px;
        position: relative;
        .book {
          position: absolute;
          cursor: pointer;
          width: 170px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          padding: 0px 5px;
          background-color: #9dc9ac;
          &:hover {
            background-color: #33cc66;
          }
          &:active {
            background-color: #b193b8;
          }
        }
      }
    }
  }
  // global
  .library-menu {
    position: absolute;
    .menu {
      padding: 10px;
      text-align: center;
      background-color: #ff66cc;
      cursor: pointer;
      &:hover {
        background-color: #ff0099;
      }
    }
  }
  .library-modal {
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #6699ff;
    text-align: center;
    padding: 20px;
    .modal-input {
      width: 100%;
      line-height: 30px;
      padding: 0px 5px;
    }
    .modal-btn {
      margin: 10px 0px;
      padding: 10px;
      background-color: #ffffcc;
      cursor: pointer;
      &:hover {
        background-color: #ffcc00;
      }
    }
  }
  .library-save {
    position: fixed;
    top: 5px;
    right: 5px;
    width: 100px;
    height: 60px;
    line-height: 60px;
    background-color: red;
    color: white;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #33cc66;
    }
    &:active {
      background-color: #b193b8;
    }
  }
}
</style>