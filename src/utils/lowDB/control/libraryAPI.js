/**
 * 这个 library 是笔记系统的 Control 层，专门制作返回笔记系统需要的接口
 * 1.区块表：blocks：{blockId, name, color}
 * 2.书架表：shelfs：{blockId, shelfId, name}
 * 3.藏书表：books：{bookId, shelfId, name, content}
 */
import { DB } from '../model/node_lowDB.js'
const shortid = require('shortid')

// *************************************** CRUD 区块
function block_get(blockId) {
    try {
        let result = DB.get('blocks')
            .get(blockId)
            .cloneDeep()
            .value()
        if (!result) throw new Error('目标不存在！')
        return result
    } catch (error) {
        console.log('%c ' + error, 'color: red;')
    }
}
export function block_create(blockName) {
    try {
        let Id = shortid.generate()
        let target = DB.get('blocks')
        let value = { blockId: Id, name: blockName, color: '#666666' }
        target.set(Id, value).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function block_editName(blockId, newName) {
    try {
        block_get(blockId)
        DB.get('blocks')
            .get(blockId)
            .set('name', newName)
            .write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function block_remove(blockId) {
    try {
        // 删除区块下所有书架
        let list = getShelfList(blockId)
        list.forEach((shelf) => {
            if (shelf.blockId === blockId) shelf_remove(shelf.shelfId)
        })
        // 删除区块
        block_get(blockId)
        DB.unset(['blocks', blockId]).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// 获取区块列表
export function getBlockList() {
    try {
        let blocks = DB.get('blocks')
            .cloneDeep()
            .value()
        let list = []
        for (let key in blocks) {
            let item = blocks[key]
            list.push(item)
        }
        return list
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// *************************************** CRUD 书架
function shelf_get(shelfId) {
    try {
        let result = DB.get('shelfs')
            .get(shelfId)
            .cloneDeep()
            .value()
        if (!result) throw new Error('目标不存在！')
        return result
    } catch (error) {
        console.log('%c ' + error, 'color: red;')
    }
}
export function shelf_create(blockId, shelfName) {
    try {
        let Id = shortid.generate()
        let target = DB.get('shelfs')
        let value = { blockId: blockId, shelfId: Id, name: shelfName }
        target.set(Id, value).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function shelf_editName(shelfId, newName) {
    try {
        shelf_get(shelfId)
        DB.get('shelfs')
            .get(shelfId)
            .set('name', newName)
            .write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function shelf_remove(shelfId) {
    try {
        // 删除书架上所有书籍
        let list = getBookList(shelfId)
        list.forEach((book) => {
            if (book.shelfId === shelfId) book_remove(book.bookId)
        })
        // 删除书架
        shelf_get(shelfId)
        DB.unset(['shelfs', shelfId]).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// 获取书架列表
export function getShelfList(blockId) {
    try {
        let shelfs = DB.get('shelfs')
            .cloneDeep()
            .value()
        let list = []
        for (let key in shelfs) {
            let item = shelfs[key]
            if (item.blockId === blockId) {
                item['books'] = getBookList(item.shelfId)
                list.push(item)
            }
        }
        return list
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// *************************************** CRUD 藏书
function book_get(bookId) {
    try {
        let result = DB.get('books')
            .get(bookId)
            .cloneDeep()
            .value()
        if (!result) throw new Error('目标不存在！')
        return result
    } catch (error) {
        console.log('%c ' + error, 'color: red;')
    }
}
export function book_create(blockId, shelfId, bookName, bookContent) {
    try {
        if (!block_get(blockId) || !shelf_get(shelfId))
            throw new Error('父级不存在')
        // 赋值
        let Id = shortid.generate()
        let target = DB.get('books')
        let value = {
            blockId: blockId,
            shelfId: shelfId,
            bookId: Id,
            name: bookName,
            content: bookContent,
        }
        target.set(Id, value).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function book_editName(bookId, newName) {
    try {
        let target = DB.get('books')
            .get(bookId)
            .cloneDeep()
            .value()
        if (!target) throw Error('书籍不存在')
        DB.get('books')
            .get(bookId)
            .set('name', newName)
            .write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
export function book_remove(bookId) {
    try {
        let target = DB.get('books')
            .get(bookId)
            .cloneDeep()
            .value()
        if (!target) throw Error('书籍不存在')
        DB.unset(['books', bookId]).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// 获取书籍列表
export function getBookList(shelfId) {
    try {
        let books = DB.get('books')
            .cloneDeep()
            .value()
        let list = []
        for (let key in books) {
            let item = books[key]
            item.content = ''
            if (item.shelfId === shelfId) list.push(item)
        }
        return list
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// 根据书籍ID 取得书籍内容
export function book_getContent(bookId) {
    try {
        let book = book_get(bookId)
        return book.content
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}
// 根据书籍ID 设置书籍内容
export function book_setContent(bookId, newContent) {
    try {
        let book = DB.get('books').get(bookId)
        if (!book) throw Error('书籍不存在')
        book.set('content', newContent).write()
        console.log('保存成功', bookId)
        // window.alert("保存成功");
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}

// *************************************** 额外
// 清除脏数据：请慎重使用
function clearDirtyData() {
    try {
        // 如果书籍的 blockId 不存在，删除这个书籍
        let map = DB.get('books')
            .cloneDeep()
            .value()
        let count = 0
        for (let e in map) {
            let id = map[e].blockId
            let blockByBookId = DB.get('blocks')
                .get(id)
                .cloneDeep()
                .value()
            if (!blockByBookId) {
                book_remove(e)
                count++
            }
            console.log('删除了不正常区块下的书籍', count)
        }
        count = 0
        // 如果书架的 blockId 不存在，删除这个书架
        map = DB.get('shelfs')
            .cloneDeep()
            .value()
        for (let e in map) {
            let id = map[e].blockId
            let blockByShelfId = DB.get('blocks')
                .get(id)
                .cloneDeep()
                .value()
            if (!blockByShelfId) {
                shelf_remove(e)
                count++
            }
            console.log('删除了不正常区块下的书架', count)
        }
    } catch (error) {
        console.log('%c ' + error, 'color: red;')
    }
}
