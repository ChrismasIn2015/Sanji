module.exports = {
  // ** 20/02/22 fix 组件使用 App.vue 导入的sass公共变量无效问题 **
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/ui/wqao-ui/common-ui-consts.scss"`
      },
      scss: {
        prependData: `@import "~@/ui/wqao-ui/common-ui-consts.scss";`
      }
    }
  }
  // ** 20/02/22 fix 组件使用 App.vue 导入的sass公共变量无效问题 End **
  // ** 20/03/17 解决跨域方案1 **
  // devServer: {
  //   proxy: {
  //     "/toProxy": {
  //       target: "http://192.168.1.111:62473", // 开发环境
  //       // target: "http://192.168.0.241:3002", // 测试环境
  //       // target: "http://47.96.83.35:3002", // 生产环境
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         "^/toProxy": ""
  //       }
  //     }
  //   }
  // }
  // ** 20/03/17 解决跨域方案 End **

  // github page
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/"
};
