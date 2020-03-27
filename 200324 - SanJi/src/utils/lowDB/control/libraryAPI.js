/**
 * 这个 library 是笔记系统的 Control 层，专门制作返回笔记系统需要的接口
 * 1.区块表：blocks：{blockId, name, color}
 * 2.书架表：shelfs：{blockId, shelfId, name}
 * 3.藏书表：books：{bookId, shelfId, name, content}
 */
import { DB } from "../model/node_lowDB.js";
const shortid = require("shortid");

// 1. 获取区块列表
export function getBlockList() {
  try {
    let blocks = DB.get("blocks").value();
    let list = [];
    for (let key in blocks) {
      let item = blocks[key];
      list.push(item);
    }
    return list;
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
// 2. 获取书架列表
export function getShelfList(blockId) {
  try {
    let shelfs = DB.get("shelfs").value();
    let list = [];
    for (let key in shelfs) {
      let item = shelfs[key];
      if (item.blockId === blockId) {
        item["books"] = getBookList(item.shelfId);
        list.push(item);
      }
    }
    return list;
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
// 3. 获取书籍列表
export function getBookList(shelfId) {
  try {
    let books = DB.get("books").value();
    let list = [];
    for (let key in books) {
      let item = books[key];
      item.content = "";
      if (item.shelfId === shelfId) list.push(item);
    }
    return list;
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
// *************************************** 添加/查询/修改/删除区块
export function createBlock(blockName) {
  try {
    let Id = shortid.generate();
    let target = DB.get("blocks");
    let value = { blockId: Id, name: blockName, color: "#666666" };
    target.set(Id, value).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
function getBlock(blockId) {
  try {
    let result = DB.get("blocks")
      .get(blockId)
      .value();
    if (!result) throw new Error("目标不存在！");
    return result;
  } catch (error) {
    console.log("%c " + error, "color: red;");
  }
}
export function editBlockName(blockId, newName) {
  try {
    getBlock(blockId);
    DB.get("blocks")
      .get(blockId)
      .set("name", newName)
      .write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
export function removeBlock(blockId) {
  try {
    getBlock(blockId);
    DB.unset(["blocks", blockId]).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
// *************************************** 添加/查询/修改/删除 书架
export function createShelf(blockId, shelfName) {
  try {
    let Id = shortid.generate();
    let target = DB.get("shelfs");
    let value = { blockId: blockId, shelfId: Id, name: shelfName };
    target.set(Id, value).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
function getShelf(shelfId) {
  try {
    let result = DB.get("shelfs")
      .get(shelfId)
      .value();
    if (!result) throw new Error("目标不存在！");
    return result;
  } catch (error) {
    console.log("%c " + error, "color: red;");
  }
}
export function editShelfName(shelfId, newName) {
  try {
    getShelf(shelfId);
    DB.get("shelfs")
      .get(shelfId)
      .set("name", newName)
      .write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
export function removeShelf(shelfId) {
  try {
    getShelf(shelfId);
    DB.unset(["shelfs", shelfId]).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
// *************************************** 添加/查询/修改/删除 藏书
export function createBook(blockId, shelfId, bookName, bookContent) {
  try {
    if (!getBlock(blockId) || !getShelf(shelfId)) throw new Error("父级不存在");
    // 赋值
    let Id = shortid.generate();
    let target = DB.get("books");
    let value = {
      blockId: blockId,
      shelfId: shelfId,
      bookId: Id,
      name: bookName,
      content: bookContent
    };
    target.set(Id, value).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
export function getBook(bookId) {
  try {
    let result = DB.get("books")
      .get(bookId)
      .value();
    if (!result) throw new Error("目标不存在！");
    return result;
  } catch (error) {
    console.log("%c " + error, "color: red;");
  }
}
export function editBookName(bookId, newName) {
  try {
    let target = DB.get("books")
      .get(bookId)
      .value();
    if (!target) throw Error("书籍不存在");
    DB.get("books")
      .get(bookId)
      .set("name", newName)
      .write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
export function removeBook(bookId) {
  try {
    let target = DB.get("books")
      .get(bookId)
      .value();
    if (!target) throw Error("书籍不存在");
    DB.unset(["books", bookId]).write();
  } catch (error) {
    console.log("%c" + error, "color: red;");
  }
}
