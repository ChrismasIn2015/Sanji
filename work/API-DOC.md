# 处处有码（Web 接口）

## 1. 准备

### - 统一格式

```
1.需要身份验证的地方 Http会固定设置请求头: Authorization: token: String
2.返回字段统一大写开头, 并使用驼峰命名 例: "Result"
3.请求返回值格式
  {
    "Result": null,
    "Code": 400,
    "Message": "错误信息"
  }
```

### - code 含义对照表

```
200: 成功返回数据
400：无法取得约定参数
401：用户无权限：token 过期
405：请求方法错误
500：服务器错误
```

## 2.接口列表

### 1.1 账户相关

- [神手云账户登录 login](#login)
- [神手云账户注册 register](#register)
- [神手云账户修改密码 resetPassword](#resetpassword)
- []()
- [# 暂时不开发 神手云账户-充值 ](#)
- [# 暂时不开发 神手云账户-消费 ](#)
- [# 暂时不开发 注册神手云账户是否绑定手机号 ](#)
- [# 暂时不开发 获取神手云账户信息 getAccountInfo](#getaccountinfo)

### 1.2 第三方相关

- [上传图片 postImage](#postimage)
- [手机号获取验证码 getPhoneCode](#getphonecode)

### 1.3 业务相关

#### 1.3.1 活码模块

- [修改/新增某个活码 editAdminCode](#editadmincode)
- [获取活码列表 getAdminCodeList](#getadmincodelist)
- [获取某个活码的分日数据 getAdminCodeCounts](#getadmincodecounts)
- [获取某个活码的子码展示模式 getAdminShowType](#getadminshowtype)
- [修改某个活码的子码展示模式 setAdminShowType](#setadminshowtype)
- [删除某个活码 deleteAdminCode](#deleteadmincode)
- []()
- [编辑/新增某个子码 editChildCode](#editchildcode)
- [获取子码列表 getChildCodeList](#getchildcodelist)
- [对某个活码下的子码列表进行排序 sortChildCodeList](#sortchildcodelist)
- [删除子码 deleteChildCode](#deletechildcode)
- []()
- [结果页-获取某个子码 getTargetCode](#gettargetcode)
- [结果页-长按某个子码 scanTargetCode](#scantargetcode)

---

## 1.1 账户相关接口列表

### login

神手云账户登录

POST /api/account/login

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| phone     | string | 手机号      | yes  |         |
| password  | string | 密码        | yes  |         |

```
{
  "result": {
    Phone: String
    Token: String
  },
  "code": 200,
  "message": null
}
```

### register

神手云账户注册

POST /api/account/register

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| phone     | string | 手机号      | yes  |         |
| phoneCode | string | 验证码      | yes  |         |
| password  | string | 密码        | yes  |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}
```

### resetPassword

修改神手云账户密码

POST /api/account/resetPassword

| Attribute   | Type   | Description | must | Remarks |
| ----------- | ------ | ----------- | ---- | ------- |
| phone       | string | 手机号      | yes  |         |
| phoneCode   | string | 验证码      | yes  |         |
| newPassword | string | 新密码      | yes  |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}

```

## 1.2 第三方相关接口列表

### postImage

上传图片

POST /api/account/postImage

| Attribute | Type     | Description             | must | Remarks |
| --------- | -------- | ----------------------- | ---- | ------- |
| form-data | FormData | Context-type: form-data | yes  |         |

```
{
  "result": {
    Url: String
  },
  "code": 200,
  "message": null
}
```

### getPhoneCode

手机号获取验证码

POST /api/account/getPhoneCode

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| phone     | String |             | yes  |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}
  # 注意：getPhoneCode 具有间隔时间内"仅能请求成功一次"特性
```

## 1.3 业务相关

## 1.3.1 活码模块

### editAdminCode

修改/新增某个活码

POST /api/code/createAdminCode

| Attribute     | Type   | Description  | must | Remarks           |
| ------------- | ------ | ------------ | ---- | ----------------- |
| Id            | Number | 活码 Id      | yes  | 如果是新增则传-1  |
| adminType     | Number | 活码类型     | yes  | 0 群聊码 1 客服码 |
| adminTitle    | String | 活码名称     | yes  |                   |
| adminRemark   | String | 活码备注     | no   |                   |
| modes         | Object | 活码功能     | yes  | 详见下方备注      |
| adminShowType | Number | 子码展示方式 | yes  | 0 标准 1 轮播     |
| InvalidDate   | String | 活码过期时间 | yes  |                   |

```
# 备注：参数 modes 内容本来有固定四个, 2020/02/27 暂定三个
{
  NoRepeat: Boolean, // 如果不设置 就会传 false "防止重复入群/防止重复添加"
  Administrator: ? // 管理员微信功能待确定 暂时不传, "管理员微信"
  SafeTip: Boolean, // 写死
  CustomerService: String // 如果不设置 就会传空Url "客服功能"
}
---------------------------- 返回值 ----------------------------
{
  "result": {
    Id: Number, // 创建成功的活码Id
    AdminImage: String, // 创建活码后生成的活码图片Url,
  },
  "code": 200,
  "message": null
}
```

### getAdminCodeList

获取活码列表

GET /api/code/getAdminCodeList

```
{
  "result": [
    {
      AdminType: Number,
      AdminTitle: String,
      AdminRemark: String,

      Id: Number,
      AdminImage: String, // 创建活码后生成的活码图片Url,
      ChildCount: Number, // 子二维码数量
      Counts: {
        AdminScanCount: Number, // 活码扫码计数
        ChildTouchCount: Number // 子码长按计数
      },
      CanUserCount: Number // 剩余可长按数
    }
    ...
  ],
  "code": 200,
  "message": null
}
```

### getAdminShowType

获取某个活码的子码展示模式

GET /api/code/getAdminShowType

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| Id        | Number | 活码 Id     | yes  |         |

```
{
  "result":{
    adminShowType: Number // 0 标准 1 轮播
  },
  "code": 200,
  "message": null
}
```

### setAdminShowType

修改某个活码的子码展示模式

POST /api/code/setAdminShowType

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| Id        | Number | 活码 Id     | yes  |         |

```
{
  "result":{
    adminShowType: Number // 0 标准 1 轮播
  },
  "code": 200,
  "message": null
}
```

### getAdminCodeCounts

获取某个活码分日数据

GET /api/code/getAdminCodeCounts

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| Id        | Number | 活码 Id     | yes  |         |

```
{
  "result":
    {
      Counts: [
        {
          Time: xxxx-xx-xx // 统计日期
          AdminScanCount: Number, // 活码扫码计数
          ChildTouchCount: Number // 子码长按计数
        }
        ...
      ]
    }
  ,
  "code": 200,
  "message": null
}
```

### deleteAdminCode

删除某个活码

POST /api/code/deleteAdminCode

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| Id        | Number | 活码 Id     | yes  |         |

```
---------------------------- 返回值 ----------------------------
{
  "result": null,
  "code": 200,
  "message": null
}
```

### editChildCode

编辑/新增某个活码下的某个子码

POST /api/code/editChildCode

| Attribute      | Type          | Description                                                                   | must | Remarks                            |
| -------------- | ------------- | ----------------------------------------------------------------------------- | ---- | ---------------------------------- |
| AdminId        | Number        | 某个活码 Id                                                                   | yes  |                                    |
| ChildId        | Number        | 某个子码 Id                                                                   | yes  | 如果是 -1 则为新增                 |
| ChildType      | Number        | 子码类型                                                                      | yes  | 0 微信二维码 1 自制海报            |
| ChildImageType | Number        | 子码图片格式                                                                  | yes  | 标准 0 适配 1 裁剪 2               |
| ChildTitle     | String        | 如果活码类型(adminType) 为 0 则该字段表示统一的群名称 为 1 则为统一的客服名称 | yes  |                                    |
| ChildsImages   | Array: Object | { imageName:String, imageUrl:String }                                         | yes  |                                    |
| ChildLogo      | String        | 子码右上角 Logo                                                               | yes  |                                    |
| ChildFrequency | Number        | 统一设置子码被长按的最大次数限制                                              | yes  |                                    |
| ChildTip       | String        | 引导文字                                                                      | no   | 子码下方的引导文字，对活码进行说明 |

```
# 备注：2020/02/27 参数 childsType 暂固定只传 0 微信二维码
---------------------------- 返回值 ----------------------------
{
  "result": null,
  "code": 200,
  "message": null
}
```

### getChildCodeList

获取某个活码下的子码列表

POST /api/code/getChildCodeList

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| Id        | Number | 活码 Id     | yes  |         |

```
---------------------------- 返回值 ----------------------------
{
  "result": [
    {
      Id: Number,
      ChildType: Number, // 0 微信二维码 1 自制海报
      ChildTitle: String, // 子码名称
      ChildImageType: Number, // 子码图片格式 标准 0 适配 1 裁剪 2
      ChildImageUrl: String, // 子码Url
      ChildImageName: String, // 子码图片名称
      ChildLogo: String, // 中央 Logo
      ChildFrequency: Number, // 子码被长按的最大次数限制
      ChildTip: String // 子码下方的引导文字，对活码进行说明
    }
    ...
  ],

  "code": 200,
  "message": null
}
```

### sortChildCodeList

对某个活码下的子码列表进行排序

POST /api/code/sortChildCodeList

| Attribute | Type          | Description          | must | Remarks |
| --------- | ------------- | -------------------- | ---- | ------- |
| Id        | Number        | 该活码 Id            | yes  |         |
| Ids       | Array: Number | 子码排序后的 Id 列表 | yes  |         |

```
---------------------------- 返回值 ----------------------------
{
  "result": null,
  "code": 200,
  "message": null
}
```

### deleteChildCode

删除某个子码

POST /api/code/deleteChildCode

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| AdminId   | Number | 活码 Id     | yes  |         |
| ChildId   | Number | 子码 Id     | yes  |         |

```
---------------------------- 返回值 ----------------------------
{
  "result": null,
  "code": 200,
  "message": null
}
```

### getTargetCode

结果页-获取某个子码

POST /api/target/getTargetCode

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| targetId  | Number |             | yes  |         |

```
{
  "result": {
    TargetId: Number
    ChildTitle
    ChildImageType
    ChildImage
    ChildImageName
    ChildLogo
    ChildTip
    InvalidDate
  },
  "code": 200,
  "message": null
}
```

### scanTargetCode

结果页-长按某个子码

POST /api/target/scanTargetCode

| Attribute | Type   | Description | must | Remarks |
| --------- | ------ | ----------- | ---- | ------- |
| targetId  | Number |             | yes  |         |

```
{
  "result": null,
  "code": 200,
  "message": null
}
```
