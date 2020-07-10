/**
 * 这个 stockStoreApi 是股票系统的 Control 层，专门股票系统需要的接口
 * 1.股票表：stockStore：{blockId, name, color}
 */
import { DB } from '../model/node_lowDB.js'
const shortid = require('shortid')
