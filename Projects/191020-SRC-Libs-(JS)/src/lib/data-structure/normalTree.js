// 结点
export function NormalTreeNode (name) {
    //
    this.name = name ? name : null
    this.prev = null
    //
    this.childs = []
}

// 普通树
export function NormalTree (name) {
    //
    this.size = 0
    this.root = new NormalTreeNode()
    this.root.name = name
    
    // 在特定结点插入自定义结点
    this.insert = function (targetName, node) {
        let result = this.BFS(targetName)
        result.childs.push(node)
        this.size++
        node.prev = result
    }
}

// 公共方法
NormalTree.prototype = {
    /**
     * 广度优先搜索 - Breadth First Search
     * 0.准备一个队列 预备放入有子节点的结点
     * 1.判断根节点是否有子节点，把所有子节点放入新队列 返回新队列 <1,1,1,....>
     * 2.判断新队列每个元素是否有子节点 有则依次放入新队列 返回新队列 <2,2,2,2.2...>
     * ...
     * => 遍历: 每次都能返回某层含有子节点的队列 树的每一层都会被遍历
     * => 搜索: 只要返回
     */
    BFS: function (targetName) {
        let queue = []
        queue.push(this.root)
        let result = this.queueBfsHandle(queue, targetName)
        while (result instanceof Array) { // get each layer data
            result = this.queueBfsHandle(result, targetName)
        }
        return result // false = no data
    },
    // 辅助方法: 返回队列中每个结点中<含有子节点>的结点, 并推入队列: 原队列废弃/返回新队列
    queueBfsHandle: function (queue, targetName) {
        let newQueue = []
        if (queue.length === 0) return false // all nodes has no childs
        queue.forEach(element => {
            if (element.childs.length>0) {
                element.childs.forEach(e => {newQueue.push(e)})
            }
            if (element.name === targetName) newQueue = element // for search 
        })
        return newQueue
    },
    /**
     * 深度优先搜索 - Deapth First Search
     * 1.准备一个队列
     * 2.判断根结点是否有子节点 -> 判断第一个子节点是否有子节点 ....
     * 3.没有子节点 退出递归
     */
    DFS: function (target) {
        let queue = []
        let result = []
        queue.push(this.root)
        return this.queueDfsHandle(queue, result, target) // false = no data
    },
    // 辅助方法
    queueDfsHandle: function (queue, result, target) {
        queue.forEach(element => {
            if (element.name === target) return element // for search
            result.push(element) // get each cloum data
            if (element.childs.length > 0){
                this.queueDfsHandle(element.childs)
            } else {
                return false
            }
        })
    }
}