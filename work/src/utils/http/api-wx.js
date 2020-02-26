// ================================================= 1.微续账号API设置
import { WqaoRequester } from "../wqao/wqao-request.js";

function wx_success(result, resolve, reject) {
    let data = result.data;
    if (data.Success) {
        resolve(data.Context);
    } else {
        reject("微续：" + data.ErrContext);
    }
}
function wx_error(error) {
    window.alert("服务器：" + error);
}
const wx_request = new WqaoRequester("http://weixuadmin.shenshoukeji.net", wx_success, wx_error);

// ================================================= 2.微续账号API
