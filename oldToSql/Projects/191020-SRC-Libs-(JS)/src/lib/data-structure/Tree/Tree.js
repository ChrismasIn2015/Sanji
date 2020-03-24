/**
 * 这个库用于在JS语法下实现一般树 Tree 的数据结构
 * 当在业务中需要使用一般树的数据结构时 可以以该库作为父类进继承
 */

export class NormalTreeNode {
    constructor(name, nodeId) {
        this.nodeId = nodeId ? nodeId : -1; // 标识唯一结点
        this.name = name ? name : null;
        this.prev = null;
        this.next = null; // nodeId: Node 嵌套
    }
}

export class NormalTree {
    size = 1; // 该树大小
    nodeIdMax = 1; // 该树Id统计
    root = null; // 默认含有根结点
    nodeMap = {}; // 该树结点地图

    // 构造方法
    constructor(name) {
        this.root = new NormalTreeNode(name, this.nodeIdMax);
        this.nodeMap[this.root.nodeId] = this.root;
    }
    // 1.插入
    nodeInsert(fatherId, newName) {
        let fatherNode = this.nodeMap[fatherId];
        if (fatherNode.next === null) fatherNode.next = {};
        // 创建新节点
        let newNode = new NormalTreeNode(newName, ++this.nodeIdMax);
        newNode.prev = fatherNode;
        // 更新该树
        fatherNode.next[this.nodeIdMax] = newNode;
        this.nodeMap[newNode.nodeId] = newNode;
        this.size++;
    }
    // 2.删除
    nodeDelete(nodeId) {
        if (this.nodeMap[nodeId] === undefined) return;
        // 更新该树
        delete this.nodeMap[nodeId].prev.next[nodeId];
        delete this.nodeMap[nodeId];
        this.size--;
    }
}

// NormalTree.prototype = {
//     /**
//      * Breadth First Search - 广度优先搜索
//      * 1.遍历B0队列（只有一个根结点）- 遍历树的第1层
//      *      - 遍历时 把每个含有子节点的结点 的子结点们无差别放入B1空队列 - 获得树的第2层
//      * 2.遍历B1队列 - 遍历树的第2层
//      *      - 遍历时 把每个含有子节点的结点 的子结点们无差别放入B2空队列 - 获得树的第3层
//      * 3.遍历B2队列
//      *      ......
//      */
//     BFS_byId: function(id) {
//         let map = {};
//         map[this.root.nodeId] = this.root;

//         let nextCount = 1;
//         let result = false;
//         // while (nextCount > 0 || !result) {
//         //     let temp = this.layerLoop(map);
//         //     result = temp.result;
//         //     nextCount = temp.count;
//         // }
//         return result;
//     },
//     // 遍历某层树的结点 返回下一层结点集合
//     layerLoop: function(map) {
//         let BFS_result = false;
//         let nextMap = {};
//         for (let e in map) {
//             // ************ 遍历操作 ************
//             console.log(map[e]);
//             // ************ 遍历操作 End ************
//             let node = JSON.parse(JSON.stringify(map[e]));
//             if (node.next !== null) {
//                 for (let e in node.next) {
//                     nextMap[enode.next[e].nodeId] = node.next[e];
//                 }
//             }
//         }
//         return {
//             nextLayerNodes: nextMap,
//             count: Object.keys(nextMap).length,
//             result: BFS_result
//         };
//     }
//     /**
//      * 深度优先搜索 - Deapth First Search
//      * 1.准备一个队列
//      * 2.判断根结点是否有子节点 -> 判断第一个子节点是否有子节点 ....
//      * 3.没有子节点 退出递归
//      */
//     // DFS: function(target) {
//     //     let queue = [];
//     //     let result = [];
//     //     queue.push(this.root);
//     //     return this.queueDfsHandle(queue, result, target); // false = no data
//     // },
//     // 辅助方法
//     // queueDfsHandle: function(queue, result, target) {
//     //     queue.forEach(element => {
//     //         if (element.name === target) return element; // for search
//     //         result.push(element); // get each cloum data
//     //         if (element.childs.length > 0) {
//     //             this.queueDfsHandle(element.childs);
//     //         } else {
//     //             return false;
//     //         }
//     //     });
//     // }
// };
