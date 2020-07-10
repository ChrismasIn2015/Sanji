/**
 * 这个 stockStoreApi 是股票系统的 Control 层，专门股票系统需要的接口
 * 1.股票表：stockIds：{stockId, stockName, stockType}
 * 2.每日表：dayInfoBystockId：{}
 * 3.每日分时表：minInfoBystockId：{}
 */
import { DB } from '../model/node_lowDB.js'
import StoreConst from './stockStoreConsts.js'
const shortid = require('shortid')

// =========================================================== 股票表export function get_stockTypeMap() {
export function add_stock(params) {
    try {
        let target = DB.get('stockIds')
        let value = {
            stockId: params.code,
            stockName: params.name,
            typeIndex: params.type,
        }
        target.set(params.code, value).write()
    } catch (error) {
        console.log('%c' + error, 'color: red;')
    }
}

// =========================================================== 通用
export function get_stockTypeMap() {
    let typeMap = StoreConst.myStockClassifyMap
    let list = Object.assign([], typeMap)
    let myMap = {}
    list.forEach((e, index) => {
        if (!myMap[e.classiFyName]) myMap[e.classiFyName] = []
        e['typeIndex'] = index
        myMap[e.classiFyName].push(e)
    })
    return myMap
}
