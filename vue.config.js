module.exports = {
    // ** 20/02/22 fix 组件使用 App.vue 导入的sass公共变量无效问题 **
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/utils/sanJi-UI/common-ui-consts.scss"`,
            },
            scss: {
                prependData: `@import "~@/utils/sanJi-UI/common-ui-consts.scss";`,
            },
        },
    },

    // ** 20/03/17 解决跨域方案1 **
    devServer: {
        proxy: {
            '/stock168': {
                // http://quotes.money.163.com/service/chddata.html
                //?code=0688333&start=20190722&end=20200708&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP
                target: 'http://quotes.money.163.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/stock168': '',
                },
            },
        },
    },

    // github page
    // publicPath: process.env.NODE_ENV === "production" ? "./" : "/"

    // Vue-Cli-Plugins-Electron-Builder
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: 'Sanji', //项目名，也是生成的安装文件名，即aDemo.exe
                win: {
                    icon: '~@/assets/favicon.ico', //图标，当前图标在根目录下，注意这里有两个坑
                },
            },
        },
    },
}
