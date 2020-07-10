const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

/**
 * 需要对DB进行抽象
 * 1.DB 第一层统一抽象为：表名称: {}
 * 2.DB 第二层抽象为二维表： 以Id为主键的记录
 */
const adapter = new FileSync('data.json')
export const DB = lowdb(adapter)
// **** 20/03/26 FileSync 内的数据库文件地址可以指定 但是打包后会报错！使用默认地址后解决！ ****

// **** 20/03/25 每次启动需要初始化笔记系统的数据库 ****
// clearLibrary();
createTable('blocks', {})
createTable('shelfs', {})
createTable('books', {})
createTable('stockStore', {})
// **** 20/03/25 每次启动需要初始化笔记系统的数据库 End ****

// 1.创建一张表
export function createTable(tableName, value) {
  try {
    DBcharge()
    tableParamsIsString(tableName)
    // * 实际建表
    let table = DB.get(tableName).value()
    if (table) {
      throw new Error(tableName + ' 已经存在！')
    } else {
      DB.set(tableName, value).write()
      console.log('%c' + '创建 table ' + tableName + '成功！', 'color: green;')
    }
  } catch (error) {
    console.log('%c' + error, 'color: red;')
  }
}

// 2.删除一张表
export function removeTable(tableName) {
  try {
    DBcharge()
    tableParamsIsString(tableName)
    // * 实际删除
    let table = DB.get(tableName).value()
    if (table) {
      DB.unset(tableName).write()
      console.log('%c table ' + tableName + ' 删除成功！', 'color: green')
    } else {
      throw new Error('删除 table ' + tableName + ' 不存在！')
    }
  } catch (error) {
    console.log('%c' + error, 'color: red;')
  }
}

// * 初始化笔记系统
export function clearLibrary() {
  // window.alert("接下来会清空数据库！");
  // let response = window.confirm("确定要清空数据库吗？！");
  // if (response)
  DB.setState({})
}

// * 参数只能为字符串
function tableParamsIsString(tableName) {
  if (typeof tableName !== 'string') {
    throw new Error(tableName + ' 必须为字符串')
  }
}
// * 数据库必须连接
function DBcharge() {
  if (!DB) throw new Error('数据库未连接！')
}
