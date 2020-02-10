<template>
  <div
    class="library"
    @click="clearMenus"
    @contextmenu.prevent.stop="shelfMenu_show($event, null, 'window')"
  >
    <!-- 书架区 -->
    <div class="library-shelfs text-cut" v-for="(shelf, index) in shelfs" :key="index">
      <div
        class="shelf-title"
        :style="{ 'background-color' : shelf.contentShow ? '#33cc66' : '' }"
        @click="books_show(shelf)"
        @contextmenu.prevent.stop="shelfMenu_show($event, shelf, 'shelf')"
      >{{ shelf.name }}</div>
      <!-- Books -->
      <canvas class="shelf-books" :id="'shelf-books-' + index" v-show="shelf.contentShow" />
    </div>

    <!-- 全局右键菜单 shelf -->
    <div
      class="shelf-menu"
      v-show="style_shelfMenu.show"
      :style="{
      'top' : style_shelfMenu.top,
      'left' : style_shelfMenu.left
    }"
    >
      <div class="menu" v-show="style_shelfMenu.type === 'window'" @click.stop="libModal_show">新建书架</div>
      <div class="menu" v-show="style_shelfMenu.type === 'shelf'">新建 Book</div>
      <div class="menu" v-show="style_shelfMenu.type === 'shelf'">重命名</div>
      <div class="menu" v-show="style_shelfMenu.type === 'shelf'" @click="shelf_remove">删除</div>
    </div>

    <!-- 全局弹窗 -->
    <!-- 输入框弹窗 -->
    <div class="library-modal" v-show="style_libModal.show" @click.stop>
      <input class="modal-input" v-model="style_libModal.name" placeholder="请输入书架名称" />
      <div class="modal-btn" @click="shelf_add">确认</div>
      <div class="modal-btn" @click="clearMenus">取消</div>
    </div>
  </div>
</template>

<script>
import { BooksTree } from "@/lib/canvas/books/books";
export default {
  data() {
    return {
      //
      shelfs: [
        { name: "计算机知识", contentShow: false },
        { name: "财经知识", contentShow: false },
        { name: "生活随想", contentShow: false }
      ],
      //
      style_shelfMenu: {
        show: false,
        top: 0,
        left: 0,
        shelf_pointer: null,
        type: "" // shelf 书架右键 window 全局右键
      },
      style_libModal: {
        show: false,
        name: ""
      }
    };
  },
  mounted() {
    let tree1 = new BooksTree("ROOT");
    tree1.nodeInsert(1, "1-111");
    tree1.nodeInsert(1, "1-222");
    tree1.nodeInsert(1, "1-333");
    tree1.nodeInsert(1, "1-444");
    tree1.nodeDelete(5);
    tree1.nodeInsert(1, "1-666");
    let tree2 = new BooksTree("ROOT2");
    console.log(tree1, tree2);
  },
  methods: {
    shelfMenu_show(event, shelf, type) {
      this.clearMenus();
      this.style_shelfMenu.show = true;
      this.style_shelfMenu.top = event.pageY;
      this.style_shelfMenu.left = event.pageX;
      this.style_shelfMenu.shelf_pointer = shelf ? shelf : null;
      this.style_shelfMenu.type = type; // shelf 书架右键 window 全局右键
    },
    libModal_show() {
      this.clearMenus();
      this.style_libModal.show = true;
    },
    shelf_add() {
      // 1.不允许为空
      if (!this.style_libModal.name) {
        window.alert("不能为空");
        return;
      }
      // 2.不允许重名
      //
      this.shelfs.push({
        name: this.style_libModal.name,
        contentShow: false
      });
      this.clearMenus();
    },
    shelf_remove() {
      let tempArr = JSON.parse(JSON.stringify(this.shelfs));
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].name === this.style_shelfMenu.shelf_pointer.name) {
          tempArr.splice(i, 1);
          break;
        }
      }
      this.shelfs = Object.assign([], tempArr);
    },
    books_show(shelf) {
      shelf.contentShow = !shelf.contentShow;
    },
    clearMenus() {
      this.style_libModal.name = "";
      this.style_shelfMenu.show = false;
      this.style_libModal.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// 最外层
.library {
  min-height: 100%;
  background-color: #ffffcc;
  padding: 5px;
  // 2 - 导航书架区
  .library-shelfs {
    margin-bottom: 5px;
    // 2.1
    .shelf-title {
      width: 100px;
      height: 60px;
      background-color: #336690;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #33cc66;
      }
    }
    // 2.2
    .shelf-books {
      border: 2px solid red;
      margin: 5px 0px;
    }
  }
  // 3 - 右键shelf菜单
  .shelf-menu {
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
  // 4 - 全局弹窗
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
}
</style>