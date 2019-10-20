// 结点
export function NormalTreeNode (name, value) {
    //
    this.name = name ? name : null
    this.value = value ? value : null
    //
    this.childs = []
}

// 普通树
export function NormalTree () {
    //
    this.size = 0
    this.root = new NormalTreeNode()
    this.root.name = 'root'
    this.root.value = 'root s value'

    // 在特定结点插入自定义结点
    this.insert = function (name, node) {
        let target = this.queryNode(name)
        if (target) {
            for (let i=0; i<target.childs.length; i++) {
                if (target.childs[i].name === node.name) {
                    target.childs[i] = node
                    this.size++
                    return true
                }
            }
            target.childs.push(node)
            this.size++
            return true
        }
        return false
    }
    // 查找特定结点
    this.queryNode = function (targetName) {
        let result = false
        if (this.root.name === targetName) return this.root
        this.childsTravelsing(this.root, function(node){
            if (result === targetName) return
            if (node.name === targetName) {
                result = node
                return result
            }
            this.childsTravelsing(node)

        })
        return result // 没找到
    }
}

// 公共方法
NormalTree.prototype = {
    // 遍历一个结点的子节点
    childsTravelsing: function (node, callback) {
        if (node.childs.length > 0) {
            node.childs.forEach(element => { callback(element) })
        } else {
            return node.name + ' has no childs'
        }
    }
}