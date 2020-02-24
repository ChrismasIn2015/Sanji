import axios from "axios";
// ======================================== 微续-营销二维码

// 特殊：登录必须检测
export function checkUser(openid) {
    let UserType = 1;
    return request(
        "get",
        "/api/user/CheckUser",
        {
            openid,
            UserType
        },
        1
    );
}

// 获取父二维码列表
export function getQrGroupList(openid) {
    let Type = 1;
    return request(
        "get",
        "/api/Qrcode/GetGroupList",
        {
            openid,
            Type
        },
        1
    );
}

// 删除父二维码
export function deleteQrGroup(idArray) {
    return request(
        "post",
        "/api/Qrcode/DeleteGroup",
        {
            Id: idArray
        },
        1
    );
}

// 获取历史库Code列表
export function getCodeHistory(openid) {
    let type = 1;
    return request(
        "get",
        "/api/Qrcode/GetQrlist",
        {
            openid,
            type
        },
        1
    );
}

// 历史库新增Code
export function postHistoryQrCode(CodeImg, Name, openid) {
    let Type = 1;
    return request(
        "post",
        "/api/Qrcode/SaveQRcode",
        {
            CodeImg,
            Name,
            openid,
            Type
        },
        1,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
}

// 历史库删除Code
export function deleteCodeHistory(idArray) {
    return request(
        "post",
        "/api/Qrcode/DeleteQrcode",
        {
            id: idArray
        },
        1
    );
}

// 历史库Code改名
export function historyReName(id, name) {
    return request(
        "post",
        "/api/Qrcode/updateqrname",
        {
            id,
            name
        },
        1
    );
}

// 获取子二维码列表
export function getQrCodeList(openid, id) {
    let Type = 1;
    return request(
        "get",
        "/api/qrcode/GetUsermarketgroups",
        {
            openid,
            Type,
            id
        },
        1
    );
}

// 新增子二维码
export function getImgUrl(formData) {
    return request("post", "/api/Global/UpLoadFile", formData, 1);
}
export function addQrCode(MarketCodeId, QRcodeId, Height, MaxShowCount) {
    return request(
        "post",
        "/api/qrcode/AddMarketQrcode",
        {
            MarketCodeId,
            QRcodeId,
            Height,
            MaxShowCount
        },
        1
    );
}

// 删除子二维码
export function deleteQrCode(Id) {
    return request(
        "post",
        "/api/qrcode/delete",
        {
            Id
        },
        1
    );
}

// 新增父二维码
export function addQrGroup(Openid, Ids, Name, MarketType, MaxShowCount, logoUrl) {
    let Type = 1;
    return request(
        "post",
        "/api/Qrcode/Savemarketgroups",
        {
            Openid,
            Type,
            Name,
            Ids,
            MarketType, // 0 平均分配 1 顺序 2 权重
            MaxShowCount,
            logoUrl
        },
        1
    );
}

// 修改父二维码 名称
export function updateQrGroupName(id, name) {
    return request(
        "post",
        "/api/qrcode/UpdateMaketName",
        {
            id,
            name
        },
        1
    );
}

// 修改父二维码 上限
export function updateQrGroupMax(id, maxCount) {
    return request(
        "post",
        "/api/qrcode/UpdateMaxCount",
        {
            id,
            maxCount
        },
        1
    );
}

// 修改父二维码 规则
export function updateQrGroup(id, marketType, codes) {
    return request(
        "post",
        "/api/qrcode/UpdateMarketSord",
        {
            id,
            marketType,
            codes
        },
        1
    );
}

// ======================================== 微续账号
// 登录
export function wx_login(username, password) {
    return request(
        "post",
        "/api/user/login",
        {
            username: username,
            password: password
        },
        0
    );
}
// 验证账号是否已注册
export function wx_accountCheck(PhonNumber, Code) {
    return request(
        "post",
        "/api/user/vercode/check",
        {
            PhonNumber,
            Code
        },
        0
    );
}
// 发送手机验证码
export function wx_sendPhoneCode(PhonNumber) {
    return request(
        "post",
        "/api/user/vercode/send",
        {
            PhonNumber: PhonNumber
        },
        0
    );
}
// 注册
export function wx_register(UserName, Password, Phone, Company) {
    return request(
        "post",
        "/api/user/saveadmin",
        {
            UserName,
            Password,
            Phone,
            Company
        },
        0
    );
}

// 修改密码
export function wx_newPassword(PhonNumber, Code, Pwd) {
    return request(
        "post",
        "/api/user/retrieve/pwd",
        {
            PhonNumber,
            Code,
            Pwd
        },
        0
    );
}

// ======================================== 通用 0 微续账号API 1 营销二维码API
function request(methods, url, params, apiType, myConfig) {
    const ACCOUNT_URL = "http://weixuadmin.shenshoukeji.net";
    const QrCode_URL = "http://yxwx.shenshoukeji.net";

    return new Promise((resolve, reject) => {
        let _url = "";
        if (apiType === 0) _url = ACCOUNT_URL + url;
        if (apiType === 1) _url = QrCode_URL + url;
        // 1.处理微续账号 API
        if (apiType === 0) {
            axios({
                method: methods,
                url: _url,
                data: params
            })
                .then(result => {
                    let data = result.data;
                    if (data.Success) {
                        resolve(data.Context);
                    } else {
                        reject(data.ErrContext);
                    }
                })
                .catch(e => {
                    window.alert("服务器错误", e);
                });
        }
        // 2.处理营销二维码 API
        if (apiType === 1) {
            if (methods === "get") {
                axios
                    .get(_url, { params: params })
                    .then(res => {
                        let result = res.data;
                        if (result.code === 200) {
                            resolve(result.data);
                        } else {
                            reject(result.msg);
                        }
                    })
                    .catch(e => {
                        window.alert("服务器错误", e);
                    });
            }
            if (methods === "post") {
                axios(
                    {
                        method: methods,
                        url: _url,
                        data: params
                    },
                    myConfig
                )
                    .then(res => {
                        let result = res.data;
                        if (result.code === 200) {
                            resolve(result.data);
                        } else {
                            reject(result.msg);
                        }
                    })
                    .catch(e => {
                        window.alert("服务器错误", e);
                    });
            }
        }
    });
}
