// ================================================= 1.微续账号API设置
import { WqaoRequester } from "../wqao/wqao-request.js";

function wx_success(result, resolve, reject) {
    let data = result.data;
    if (data.code === 200) {
        resolve(data.result);
    } else {
        reject("业务 Error：" + data.message);
    }
    // {
    //     "result": null,
    //     "code": 200,
    //     "message": "string"
    // }
}
function wx_error(error, reject) {
    reject("HTTP Error：" + error.message);
}
// 192.168.0.241:3002
// http://222.66.148.78:33003
const SERVE_URL =
    process.env.NODE_ENV === "development"
        ? "http://192.168.1.111:62473"
        : "http://192.168.0.241:3002";
const wx_request = new WqaoRequester(SERVE_URL, wx_success, wx_error);

// ================================================= 2.微续账号API

// 登录
export function login(phone, password) {
    let params = { phone, password };
    return wx_request.request("POST", "/api/auth/login", params);
}

// 注册
export function register(phone, phoneCode, password) {
    let params = { phone, phoneCode, password };
    return wx_request.request("POST", "/api/auth/regist", params);
}

// 修改密码
export function resetPassword(phone, code, password) {
    let params = { phone, code, password };
    return wx_request.request("POST", "/api/auth/setPassword", params);
}

// 获取验证码
export function getPhoneCode(PhoneNumber) {
    let params = { PhoneNumber };
    return wx_request.request("POST", "/api/auth/sendCode", params);
}
