const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/**
 * 需要对DB进行抽象
 * 1.DB 第一层统一抽象为：表名称 <= 以Id为主键的记录集合
 */
const adapter = new FileSync("./src/utils/lowDB/model/data.json");
const DB = lowdb(adapter);
console.log("连接lowDB成功！");
DB.defaults({ init: "123" }).write();

// 1.创建一张表
export function createTable(tableName) {
  // 1.参数只能为字符串
  if (typeof tableName !== "string") {
    console.log(tableName, "必须为字符串！：function createTable");
    return;
  }
  // 2.实际建表
  let table = DB.get(tableName).value();
  if (table) {
    console.log(tableName, "已经存在！：function createTable");
  } else {
    DB.set(tableName, {}).write();
    console.log("创建table成功！：function createTable", tableName);
  }
}
