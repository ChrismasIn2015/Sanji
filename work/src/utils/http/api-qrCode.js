// ================================================= 1.营销二维码 API 设置
import { WqaoRequester } from "../wqao/wqao-request.js";

function qr_success(result, resolve, reject) {
    let data = result.data;
    // token 过期
    if (data.code === 401) {
        localStorage.setItem("qrCodeToken", null);
        window.location.reload();
    }
    //
    if (data.code === 200) {
        resolve(data.result);
    } else {
        reject("业务 Error" + data.message);
    }
    // {
    //    "result": null,
    //    "code": 200,
    //    "message": null
    // }
}
function qr_error(error, reject) {
    reject("HTTP Error：" + error.message);
}
// 192.168.0.241:3002
// http://222.66.148.78:33003
const SERVE_URL =
    process.env.NODE_ENV === "development"
        ? "http://192.168.1.111:62473"
        : "http://192.168.0.241:3002";
const qr_request = new WqaoRequester(SERVE_URL, qr_success, qr_error);

// ================================================= 2.业务 API

function getTokenConfig() {
    let token = localStorage.getItem("qrCodeToken");
    let config = {};
    if (token) config["headers"] = { Authorization: "Bearer " + token };
    return config;
}

// 上传图片
export function postImage(FormData) {
    let config = getTokenConfig();
    config["headers"]["content-type"] = "form-data";
    return upload_request.request("POST", "/api/Global/UpLoadFile", FormData, config);
}

// 1.修改/新增活码
export function editAdminCode(
    Id,
    adminType,
    adminTitle,
    adminRemark,
    modes,
    adminShowType,
    InvalidDate
) {
    let params = {
        Id,
        adminType,
        adminTitle,
        adminRemark,
        modes,
        adminShowType,
        InvalidDate
    };
    return qr_request.request("POST", "/api/code/createAdminCode", params, getTokenConfig());
}
// 2.获取活码列表 getAdminCodeList
export function getAdminCodeList() {
    let params = {};
    return qr_request.request("GET", "/api/code/getAdminCodeList", params, getTokenConfig());
}
// 3.获取某个活码的分日数据 getAdminCodeCounts
export function getAdminCodeCounts(Id) {
    let params = { Id };
    return qr_request.request("POST", "/api/code/getAdminCodeCounts", params, getTokenConfig());
}
// 4.获取某个活码的子码展示模式 getAdminShowType
export function getAdminShowType(Id) {
    let params = { Id };
    return qr_request.request("GET", "/api/code/getAdminShowType", params, getTokenConfig());
}
// 5.修改某个活码的子码展示模式 setAdminShowType
export function setAdminShowType(Id) {
    let params = { Id };
    return qr_request.request("POST", "/api/code/setAdminShowType", params, getTokenConfig());
}
// 6.删除某个活码 deleteAdminCode
export function deleteAdminCode(Id) {
    let params = { Id };
    return qr_request.request("POST", "/api/code/deleteAdminCode", params, getTokenConfig());
}

// 7.编辑 / 新增某个子码 editChildCode
export function editChildCode(
    AdminId,
    ChildId,
    ChildType,
    ChildImageType,
    ChildTitle,
    ChildsImages,
    ChildLogo,
    ChildFrequency,
    ChildTip,
    InvalidDate
) {
    let params = {
        AdminId,
        ChildId,
        ChildType,
        ChildImageType,
        ChildTitle,
        ChildsImages,
        ChildLogo,
        ChildFrequency,
        ChildTip,
        InvalidDate
    };
    return qr_request.request("POST", "/api/code/editChildCode", params, getTokenConfig());
}
// 8.获取子码列表 getChildCodeList
export function getChildCodeList(Id) {
    let params = { Id };
    return qr_request.request("POST", "/api/code/getChildCodeList", params, getTokenConfig());
}
// 9.对某个活码下的子码列表进行排序 sortChildCodeList
export function sortChildCodeList(Id, Ids) {
    let params = { Id, Ids };
    return qr_request.request("GET", "/api/code/sortChildCodeList", params, getTokenConfig());
}
// 10.删除子码 deleteChildCode
export function deleteChildCode(AdminId, ChildId) {
    let params = { AdminId, ChildId };
    return qr_request.request("POST", "/api/code/deleteChildCode", params, getTokenConfig());
}

// ================ 结果页
export function getTargetCode(targetId) {
    let params = { targetId };
    return qr_request.request("POST", "/api/target/getTargetCode", params, getTokenConfig());
}

// =======================================================
function upload_success(result, resolve, reject) {
    let data = result.data;
    //
    if (data.code === 200) {
        resolve(data.data);
    } else {
        reject("业务 Error" + data.msg);
    }
    // {
    //    "data": null,
    //    "code": 200,
    //    "msg": null
    // }
}
function upload_error(error, reject) {
    reject("HTTP Error：" + error);
}
const upload_request = new WqaoRequester(SERVE_URL, upload_success, upload_error);
