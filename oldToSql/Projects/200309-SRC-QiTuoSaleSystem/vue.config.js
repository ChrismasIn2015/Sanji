module.exports = {
    css: {
        // ** 20/02/22 fix 组件使用 App.vue 导入的sass公共变量无效问题 **
        loaderOptions: {
            sass: {
                prependData: `@import "~@/common-ui/common-ui-consts.scss"`
            },
            scss: {
                prependData: `@import "~@/common-ui/common-ui-consts.scss";`
            }
        }
        // ** 20/02/22 fix 组件使用 App.vue 导入的sass公共变量无效问题 End **
    },
    // for github page
    publicPath: process.env.NODE_ENV === "production" ? "/QiTuoSaleSystem/" : "/"
};
