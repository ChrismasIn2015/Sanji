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

-   [神手云账户登录 login](#login)
-   [神手云账户注册 register](#register)
-   [神手云账户修改密码 resetPassword](#resetpassword)
-   []()
-   [# 暂时不开发 神手云账户-充值 ](#)
-   [# 暂时不开发 神手云账户-消费 ](#)
-   [# 暂时不开发 注册神手云账户是否绑定手机号 ](#)
-   [# 暂时不开发 获取神手云账户信息 getAccountInfo](#getaccountinfo)

### 1.2 第三方相关

-   [上传图片 postImage](#postimage)
-   [手机号获取验证码 getPhoneCode](#getphonecode)

### 1.3 业务相关

#### 1.3.1 活码模块

-   [创建活码 createAdminCode](#createadmincode)
-   [获取活码列表 getAdminCodeList](#getadmincodelist)
-   [获取某个活码的分日数据 getAdminCodeCounts](#getadmincodecounts)
-   [获取某个活码的子码展示模式 getAdminShowType](#getadminshowtype)
-   [修改某个活码的子码展示模式 setAdminShowType](#setadminshowtype)
-   [修改某个活码 editAdminCode](#editadmincode)
-   [删除某个活码 deleteAdminCode](#deleteadmincode)
-   []()
-   [向某个活码添加子码 addChildCode](#addchildcode)
-   [获取子码列表 getChildCodeList](#getchildcodelist)
-   [对某个活码下的子码列表进行排序 sortChildCodeList](#sortchildcodelist)
-   [编辑某个子码 editChildCode](#editchildcode)
-   [删除子码 deleteChildCode](#deletechildcode)
-   []()
-   [结果页-获取某个子码 getTargetCode](#gettargetcode)
-   [结果页-长按某个子码 scanTargetCode](#scantargetcode)

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

### createAdminCode

创建活码

POST /api/code/createAdminCode

| Attribute     | Type   | Description  | must | Remarks           |
| ------------- | ------ | ------------ | ---- | ----------------- |
| adminType     | Number | 活码类型     | yes  | 0 群聊码 1 客服码 |
| adminTitle    | String | 活码名称     | yes  |                   |
| adminRemark   | String | 活码备注     | no   |                   |
| modes         | Object | 活码功能     | yes  | 详见下方备注      |
| adminShowType | Number | 子码展示方式 | yes  | 0 标准 1 轮播     |

```
# 备注：参数 modes 内容本来有固定四个, 2020/02/27 暂定三个
# 问题5：adminShowType 0 标准模式（需要长按数用尽） 1 轮播模式 是子码的还是活码的？
{
  noRepeat: Boolean, // 如果不设置 就会传 false "防止重复入群/防止重复添加"
  administrator: ? // 管理员微信功能待确定 暂时不传, "管理员微信"
  safeTip: String, // 如果不设置 就会传空字符串 "安全验证提示"
  noRepeat: String // 如果不设置 就会传空Url "客服功能"
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
      }
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
  "result": [
    {
      Counts: [{
        Time: xxxx-xx-xx // 统计日期
        AdminScanCount: Number, // 活码扫码计数
        ChildTouchCount: Number // 子码长按计数
      }]
    }
    ...
  ],
  "code": 200,
  "message": null
}
```

### editAdminCode

修改某个活码

POST /api/code/createAdminCode

| Attribute   | Type   | Description | must | Remarks           |
| ----------- | ------ | ----------- | ---- | ----------------- |
| Id          | Number | 活码 Id     | yes  |                   |
| adminType   | Number | 活码类型    | yes  | 0 群聊码 1 客服码 |
| adminTitle  | String | 活码名称    | yes  |                   |
| adminRemark | String | 活码备注    | no   |                   |
| modes       | Object | 活码功能    | yes  | 详见下方备注      |

```
# 备注：参数 modes 内容本来有固定四个, 2020/02/27 暂定三个
{
  noRepeat: Boolean, // 如果不设置 就会传 false "防止重复入群/防止重复添加"
  administrator: ? // 管理员微信功能待确定 暂时不传, "管理员微信"
  safeTip: String, // 如果不设置 就会传空字符串 "安全验证提示"
  noRepeat: String // 如果不设置 就会传空Url "客服功能"
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

### addChildCode

向某个活码添加子码

POST /api/code/addChildCode

| Attribute       | Type          | Description                                                                   | must | Remarks                            |
| --------------- | ------------- | ----------------------------------------------------------------------------- | ---- | ---------------------------------- |
| Id              | Number        | 某个活码 Id                                                                   | yes  |                                    |
| childsType      | Number        |                                                                               | yes  | 0 微信二维码 1 自制海报            |
| childsTitle     | String        | 如果活码类型(adminType) 为 0 则该字段表示统一的群名称 为 1 则为统一的客服名称 | yes  |                                    |
| childsImageType | Number        | 子码图片格式                                                                  | yes  | 标准 0 适配 1 裁剪 2               |
| childsImages    | Array: String | 子码图片列表 是一个 Url 字符串列表                                            | yes  |                                    |
| childsLogo      | String        | 统一的中央 Logo 是一个 Url                                                    | yes  |                                    |
| childsFrequency | Number        | 统一设置子码被长按的最大次数限制                                              | yes  |                                    |
| childsDeadLine  | String        | 子码失效日期                                                                  | yes  |                                    |
| childsTip       | String        | 引导文字                                                                      | no   | 子码下方的引导文字，对活码进行说明 |

```
# 备注：2020/02/27 参数 childsType 暂固定只传 0 微信二维码
# 问题1：childsTitle 是统一的名称 还是单独的名称
# 问题2：childsImageType 需要把用户的图片格式变成自定义格式 前端技术实现困难
# 问题3：childsLogo “自定义群头像/客服头像” 是统一的头像 还是单独的头像
# 问题4：childsDeadLine 活码失效后展示什么 是指活码失效吗？还是统一设置子码的失效日期
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
      ChildImage: String, // 子码Url
      ChildLogo: String, // 中央 Logo
      ChildFrequency: Number, // 子码被长按的最大次数限制
      ChildDeadLine: String, // 子码失效日期
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

### editChildCode

编辑某个活码下的某个子码

POST /api/code/editChildCode

| Attribute      | Type   | Description                                                                   | must | Remarks                            |
| -------------- | ------ | ----------------------------------------------------------------------------- | ---- | ---------------------------------- |
| AdminId        | Number | 某个活码 Id                                                                   | yes  |                                    |
| ChildId        | Number | 某个子码 Id                                                                   | yes  |                                    |
| childType      | Number |                                                                               | yes  | 0 微信二维码 1 自制海报            |
| childTitle     | String | 如果活码类型(adminType) 为 0 则该字段表示统一的群名称 为 1 则为统一的客服名称 | yes  |                                    |
| childImageType | Number | 子码图片格式                                                                  | yes  | 标准 0 适配 1 裁剪 2               |
| childImage     | String | 子码图片 是一个 Url 字符串                                                    | yes  |                                    |
| childLogo      | String | 统一的中央 Logo 是一个 Url                                                    | yes  |                                    |
| childFrequency | Number | 统一设置子码被长按的最大次数限制                                              | yes  |                                    |
| childDeadLine  | String | 子码失效日期                                                                  | yes  |                                    |
| childTip       | String | 引导文字                                                                      | no   | 子码下方的引导文字，对活码进行说明 |

```
# 备注：2020/02/27 参数 childsType 暂固定只传 0 微信二维码
# 问题1：childsType 修改后会发生什么
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
    ChildLogo
    ChildDeadLine
    ChildTip
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
