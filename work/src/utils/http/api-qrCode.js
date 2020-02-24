// ================================================= 1.营销二维码API设置
import { WqaoRequester } from "../wqao-request.js";

function qr_success(result, resolve, reject) {
    let result = res.data;
    if (result.code === 200) {
        resolve(result.data);
    } else {
        reject("二维码：" + result.msg);
    }
}
function qr_error(error) {
    window.alert("服务器：" + error);
}
const qr_request = new WqaoRequester("http://weixuadmin.shenshoukeji.net", qr_success, qr_error);

// ================================================= 2.营销二维码API
