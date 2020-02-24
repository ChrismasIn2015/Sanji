# 处处有码（Web 接口）

---

## 1.导航

### 1.1 云相关

- [注册神手云账户 register](#register)
- [注册神手云账户是否绑定手机号 phoneCheck](#phonecheck)
- [修改神手云账户密码 reSetPassword](#resetpassword)
- [登录神手云账户 login](#login)
- [获取神手云账户信息 getAccountInfo](#getaccountinfo)
- []()
- [上传图片 postImage](#postimage)
- [手机号获取验证码 getPhoneCode](#getphonecode)
- []()
- [神手云账户充值 # 待确定](#)
- [神手云账户-处处有码付费 # 待确定](#)

### 1.2 微信相关

- [获取微信群邀请码信息 wx_getInvitationInfo](#wx_getinvitationinfo)

### 1.3 业务相关

#### 1.3.1 活码模块

- [创建活码 createAdminCode](#createadmincode)
- [设置活码 editAdminCode](#editadmincode)
- [获取活码列表 getAdminCodeList](#getadmincodelist)
- [删除活码 deleteAdminCode](#deleteadmincode)
- [# 获取活码分日数据 getAdminCodeGraph](#getadmincodegraph)
- []()
- [添加子码 addChildCode](#addchildcode)
- [设置子码 editChildCode](#editchildcode)
- [获取活码列表 getChildCodeList](#getchildcodelist)
- [删除子码 getChildCodeList](#getchildcodelist)

#### 1.3.2 二维码工具模块（待议）

---

## 2.统一格式

```
1.需要身份验证则固定设置请求头
  Authorization: token

2.返回值格式
  {
    "result": null,
    "code": 400,
    "message": "错误信息"
  }
```

```
code 返回值含义
  ----------------
  200: 成功返回数据
  400：参数错误
  401：用户无权限：token 过期
  405：方法错误
  500：服务器错误
```

---

## 3.接口列表

### register

注册神手云账户

POST /api/account/register

| Attribute | Type   | Description | required | Remarks |
| --------- | ------ | ----------- | -------- | ------- |
| phone     | string | 手机号      | yes      |         |
| phoneCode | string | 验证码      | yes      |         |
| password  | string | 密码        | yes      |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}
```

### phoneCheck

检测神手云账号是否绑定了手机号

POST /api/account/phoneCheck

| Attribute | Type   | Description | required | Remarks |
| --------- | ------ | ----------- | -------- | ------- |
| phone     | string | 手机号      | yes      |         |

```
{
  "result": {
    phone: null / String
  },
  "code": 200,
  "message": null
}
```

### reSetPassword

修改神手云账户密码

POST /api/account/reSetPassword

| Attribute   | Type   | Description | required | Remarks |
| ----------- | ------ | ----------- | -------- | ------- |
| phone       | string | 手机号      | yes      |         |
| phoneCode   | string | 验证码      | yes      |         |
| newPassword | string | 新密码      | yes      |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}

```

### login

登录神手云账户

POST /api/account/login

| Attribute | Type   | Description | required | Remarks |
| --------- | ------ | ----------- | -------- | ------- |
| phone     | string | 手机号      | yes      |         |
| password  | string | 密码        | yes      |         |

```
{
  "result": {
    token: String
  },
  "code": 200,
  "message": null
}
```

### getAccountInfo

获取神手云账户信息

POST /api/account/getAccountInfo

```
{
  "result": {
    name: String: 神手账户名称
    phone: String: 神手账户手机号
    coin: Number: 神手账户余额
    // 神手账户下，处处有码产品信息
    qrCode: {
      periodHours: Number: 剩余时间(小时)
    }
  },
  "code": 200,
  "message": null
}
```

### postImage

上传图片

POST /api/account/postImage

| Attribute | Type     | Description | required | Remarks |
| --------- | -------- | ----------- | -------- | ------- |
| form-data | FormData | 表单数据    | yes      |         |

```
{
  "result": {
    url: String
  },
  "code": 200,
  "message": null
}
```

### getPhoneCode

手机号获取验证码

POST /api/account/getPhoneCode

| Attribute | Type   | Description | required | Remarks |
| --------- | ------ | ----------- | -------- | ------- |
| phone     | String |             | yes      |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}
  # 注意：getPhoneCode 具有间隔时间内"仅能请求成功一次"特性
```
