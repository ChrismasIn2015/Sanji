export function getAdminCode() {
    return {
        // 创建值
        adminType: 0, // 0 群聊集合 1 客服集合
        adminTitle: "",
        adminRemark: "",
        modes: {
            noRepeat: false,
            administrator: false,
            safeTip: false,
            customerService: ""
        },
        invalidDate: "",
        adminShowType: 0, // 子码展示模式 0 标准 1 轮播
        // 其他
        customerServiceFile: null,
        customerServiceLocal: "",
        customerServiceLocalShow: false,
        // API
        id: -1
    };
}

export function getChildCode() {
    return {
        childType: 0, // 0 微信二维码 1 海报
        childImageType: 0, // 0 标准 1 适配
        childLogo: "",
        childTitle: "",
        childsImages: [],
        childFrequency: 0,
        childDate: "",
        childTip: "",
        // 其他
        childLogoFile: null,
        childLogoLocal: "",
        childsImagesFiles: [],
        childsImagesLocal: [],
        // API
        adminId: -1,
        childId: -1,
        childImageName: "",
        childImageUrl: "",
        // 编辑
        childImageFile: null,
        childImageLocal: ""
    };
}
