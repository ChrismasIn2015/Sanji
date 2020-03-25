// 1.使用 vuex/vue-router
import router from "./router";
import store from "./store";

// 2.这个 main.js 同时也是 Electron 的渲染进程
// * 可以通过进程通信调用 ElectronAPI 或者直接调用 NodeAPI
import "./utils/lowDB/model/node_lowDB.js";
// ** 20/03/25 发现BUG！调用了node模块后在web环境会导致页面失效！需要注释对应 Node 模块！ **

// 3.导入常用web包
import "./utils/Wqao-utils/wqao-mobile-rem.js";
import "./utils/Wqao-utils/wqao-test.js";

// * 创建/挂载Vue实例对象
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
