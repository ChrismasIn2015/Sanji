<template>
    <div class="doc" @click.self.prevent='clearAllMenu' @click.self.prevent.right='showPageMenu'>

        <!-- Shelf --------------------------------------------------------- -->
        <div class="shelf" v-for='(shelf, index) in shelfs' :key="index"
            :style='{height: shelf.height + "px"}'
            @click.self='clearAllMenu'
            @click.self.right='showShelfMenu(shelf)'
        >
            <div class="shelf-title">{{ index }}</div>
            <div class="shelf-footer">
                <div class="footer-left" @click='setShelfHeight(shelf, false)'>减少</div>
                <div class="footer-right" @click='setShelfHeight(shelf, true)'>增加</div>
            </div>

            <!-- Book -->
            <div class="book"
                v-for='(book, index) in shelf.books' :key='index'
                :class="{bookActive: book.dragSwitch}"
                :style='{top: book.position.top + "px", "z-index": book.dragSwitch ? 1 : 0}'
                @mousedown.self='bookDown(book)'
                @mousemove.self='bookMove(book)'
                @mouseup.self='bookUp(book)'
            >
                <div class="book-container">
                    <div class='item title'>{{ book.title }}</div>
                    <div class='item content'>{{ book.content }}</div>
                </div>
            </div>

            <!-- Shelf 右键菜单 -->
            <div class="layout-menus" v-show='shelf.shelfMenu.show'
                :style="{ top: shelf.shelfMenu.y + 'px', left: shelf.shelfMenu.x + 'px'}" >
                <div class="right-btn text-cut" @click='newBook(shelf)'>Book Add</div>
            </div>
        </div>
        <!-- Shelf end --------------------------------------------------------- -->

        <!-- DOc 右键菜单 -->
        <div class="doc-menus" :style='pageMenuCoordinate' v-show='pageMenu.show'>
            <div class="right-btn text-cut" @click='newShelf'>Shelf Add</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 页面
            pageMenu: { show: false, x: 0, y: 0 },
            shelfModal : { books: [], shelfMenu: { show: false, x: null, y: null } },
            bookModal : { title: "New Book", content: "", position: { top: 0 }, dragSwitch: false },
            
            // 书架
            shelfs: [
                {
                    height: 180,
                    books: [
                        {
                            title: '测试',
                            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                            position: { top: 0 },
                            dragSwitch: false
                        },
                        {
                            title: '测试',
                            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                            position: { top: 0 },
                            dragSwitch: false
                        },
                        {
                            title: '测试',
                            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                            position: { top: 0 },
                            dragSwitch: false
                        },
                        {
                            title: '测试',
                            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                            position: { top: 0 },
                            dragSwitch: false
                        },
                        {
                            title: '测试',
                            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                            position: { top: 0 },
                            dragSwitch: false
                        },
                    ],
                    shelfMenu: { show: false, x: null, y: null }
                },
                {
                    height: 180,
                    books: [],
                    shelfMenu: { show: false, x: null, y: null }
                }
            ],

            // Book
            bookStartTop: null,
            bookStartOffsetY: null,
            bias: -1,
        }
    },
    mounted () {
        // BUG 直接在DOM上绑定事件 当元素拖动过快会产生鼠标/DOM脱离 => 应该绑到document上
        // document.onmousemove = (book) => {
        //     console.log(book)
        //     if (book.dragSwitch) {
        //         console.log(123)
        //         let bookDynamicTop = event.clientY - this.bookStartOffsetY - this.bias
        //         book.dragSwitch ? this.$set(book.position, "top", bookDynamicTop) : ''
        //     }
        // }
    },
    computed: {
        pageMenuCoordinate () { return { top: this.pageMenu.y + 'px', left: this.pageMenu.x + 'px' } }
    },
    methods: {
        // 1 右键 页面菜单
        showPageMenu (e) {
            this.clearAllMenu()
            this.pageMenu.x = e.offsetX
            this.pageMenu.y = e.offsetY
            this.pageMenu.show = true
        },
        newShelf () {
            this.clearAllMenu()
        },

        // 2 右键 书签菜单
        showShelfMenu (shelf) {
            this.clearAllMenu()
            shelf.shelfMenu.x = event.offsetX
            shelf.shelfMenu.y = event.offsetY
            shelf.shelfMenu.show = true
        },
        newBook (shelf) {
            this.clearAllMenu()
            shelf.books.push(JSON.parse(JSON.stringify(this.bookModal)))
        },
        setShelfHeight (shelf, type) { 
            type ? shelf.height += 200 : (shelf.height > 200 ? shelf.height -= 100 : "")
        },

        // 拖曳
        bookDown (book) {
            book.dragSwitch = true
            this.bookStartTop = event.target.offsetTop
            this.bookStartOffsetY = event.offsetY
            this.bias = event.clientY - this.bookStartOffsetY - this.bookStartTop
            // set
            let bookDynamicTop = event.clientY - this.bookStartOffsetY - this.bias
            book.dragSwitch ? this.$set(book.position, "top", bookDynamicTop) : ''
        },
        bookMove (book) {
            // set
            let bookDynamicTop = event.clientY - this.bookStartOffsetY - this.bias
            book.dragSwitch ? console.log(bookDynamicTop) : ''
            if (bookDynamicTop <= 0) bookDynamicTop = 0
            book.dragSwitch ? this.$set(book.position, "top", bookDynamicTop) : ''
        },
        bookUp (book) {
            book.dragSwitch = false
            this.dragStartTop = null
            this.bookStartOffsetY = null
            this.bias = null
        },

        // 通用
        clearAllMenu () {
            this.pageMenu.show = false
            this.shelfs.forEach(e => { e.shelfMenu.show = false })
        }
    }
} 
</script>

<style lang='scss' scoped>
// 全局
.doc{
    width: 100%; height: 100%;
    background-color: black;
    overflow: auto;
    padding: 30px;
    box-sizing: border-box;
    
    display: flex;
    // align-items: center;
    position: relative;
    .doc-menus{
        position: absolute;
        .item{ 
            display: inline-block;
            width: 100px;
            background-color: white;
        }
    }
    // 书架
    .shelf{
        box-sizing: border-box;
        min-width: 200px;
        min-height: 120px;
        margin-right: 30px;
        // background-color: white;
        // border-radius: 10px;
        border: 1px solid white;

        display: flex;
        vertical-align: top;
        flex-direction: column;
        position: relative;
        .layout-menus{
            position: absolute;
        }
        .shelf-title{
            color: white;
            text-align: center;
        }
        .shelf-footer{
            color: white;
            text-align: center;
            position: absolute;
            display: flex;
            width: 100%;
            justify-content: center;
            bottom: 0px;
            .footer-right,
            .footer-left{
                width: 50%;
                padding: 10px 0px;
                display: inline-block;
                border: 1px solid white;
            }
        }
        .book{
            width:100%;
            height: auto;
            background-color: rgb(114, 215, 223);
            box-sizing: border-box;
            padding: 5px;

            display: inline-block;
            position: absolute;
            .book-container{
                width: 80%;
                .item{
                    background-color: white;
                    word-wrap: break-word;
                }
                .title{
                    font-size: 20px;
                    line-height: 28px;
                    cursor: default;
                }
                .content{
                    cursor: pointer;
                }
            }
        }
        .bookActive{
            background-color: white;
        }
    }
}
</style>