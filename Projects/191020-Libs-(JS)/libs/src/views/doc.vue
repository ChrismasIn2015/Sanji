<template>
    <div class="doc-layout" @click.self.prevent='clearAllMenu' @click.self.prevent.right='showPageMenu'>

        <!-- 书架 -->
        <div class="layout-item" 
            v-for='(item, index) in shelfs' :key="index"
            @click.self.prevent='clearAllMenu'
            @click.self.prevent.right='showShelfMenu(item)'>
            <!-- 层级内的内容块 -->
            <div class="layout-content"></div>
            <!-- 层级右键菜单 -->
            <div class="layout-menus"
                v-if='item.shelfMenu.show'
                :style="{ top: item.shelfMenu.y + 'px', left: item.shelfMenu.x + 'px' }" >
                <div class="right-btn text-cut" @click='newBook(item)'>新增内容块</div>
            </div>
        </div>

        <!-- 全局右键菜单 -->
        <div class="doc-menus" :style='pageMenuCoordinate' v-if='pageMenu.show'>
            <div class="right-btn text-cut" @click='newShelf'>新增层级</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 页面 page => 书架 shelf => 内容 doc

            // 页面
            pageMenu: { show: false, x: 0, y: 0 },

            // 书架
            shelfs: [],
        }
    },
    created () {
        this.shelfs = []
        let temp = {
            shelfMenu: { show: false, x: 0, y: 0 }
        }
        this.shelfs.push(temp)
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
        showShelfMenu (item) {
            this.clearAllMenu()
            item.shelfMenu.x = event.offsetX
            item.shelfMenu.y = event.offsetY
            item.shelfMenu.show = true
        },
        newBook (item) {
            this.clearAllMenu()
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
.doc-layout{
    width: 100%; height: 100%;
    background-color: black;
    overflow: scroll;
    padding: 50px;
    box-sizing: border-box;
    white-space: nowrap;

    display: flex;
    align-items: center;
    position: relative;
    .doc-menus{
        position: absolute;
        .item{ 
            display: inline-block;
            width: 100px;
            background-color: white;
        }
    }
    // 层级
    .layout-item{
        box-sizing: border-box;
        min-width: 100px; min-height: 40%;
        padding: 10px;
        margin: 10px;
        background-color: white;
        border-radius: 10px;
        border: 1px solid white;

        // display: inline-block;
        position: relative;
        .layout-menus{
            position: absolute;
        }
    }
}
</style>