import { YJY_SERVER, YjyRequester } from './server.js'

// ======================================================= 构建请求
function yjy_success(result, resolve, reject) {
    let data = result.data
    if (data.code === '200') {
        resolve(data.data)
    } else {
        reject(data.msg)
    }
    // "code" / "msg" / "success" / "data"
}
function yjy_error(error, reject) {
    reject(error.message)
}
const yjy_request = new YjyRequester(YJY_SERVER, yjy_success, yjy_error)
