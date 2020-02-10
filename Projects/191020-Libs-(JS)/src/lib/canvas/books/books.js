/**
 * 绘制算法:
 *      单个 Shelf 对应一个 BooksCenter 实例
 *      通过调用 BooksCenter 实例的方法来控制 Shelf 视图
 */

// @ Control
export function BooksCenter() {
    /**
     * 算法
     *      根据图书管理需求 绘制出的画布应该是从左到右分列的图形结构（Tree 结构）
     *      自产生/接收指定格式数据, 其再根据数据绘制指定样式的画布
     */

    // 1.绘制一颗初始 BooksTree 树（导航书架新建Book）
    this.createBook = function() {};
}

// @ Model
export function BooksDrawer() {
    this.layerWidth = 200; // Shelf 每列的宽度希望是固定的
    this.maxLayerNumber = 0; // Shelf 的最大宽度为 Books绘图树 的最大层数
    this.maxBooksNumber = 0; // Shelf 的最大高度为 Books绘图树 所有层中的最大 Book 数量
}

import { NormalTreeNode, NormalTree } from "@/lib/data-structure/Tree/Tree";

export class BooksTree extends NormalTree {
    // constructor(id, name, layerNumber) {
    //     this.bookId = id;
    //     this.bookName = name;
    //     this.layerNumber = layerNumber; // Book所在树层
    //     this.bookWidth = 200; // Book的宽度 const
    //     this.bookHeight = 120; // Book的高度 const
    //     this.bookType = "link"; // Book的类型 点击后: link 跳转链接 modal 弹窗
    //     this.backColor = "yellow"; // Book的背景色
    //     this.next = null; // 子树指针
    // }
    constructor(name) {
        super(name);
    }
}
class Book extends NormalTreeNode {
    constructor(id, name, layerNumber) {
        this.bookId = id;
        this.bookName = name;
        this.layerNumber = layerNumber; // Book所在树层
        this.bookWidth = 200; // Book的宽度 const
        this.bookHeight = 120; // Book的高度 const
        this.bookType = "link"; // Book的类型 点击后: link 跳转链接 modal 弹窗
        this.backColor = "yellow"; // Book的背景色
        this.next = null; // 子树指针
    }
}
