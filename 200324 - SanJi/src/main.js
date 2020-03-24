// 1.使用 vuex/vue-router
import router from "./router";
import store from "./store";

// 2.这个 main.js 同时也是 Electron 的渲染进程
// * 可以通过进程通信调用 ElectronAPI 或者直接调用 NodeAPI
import "./utils/lowDB/model/node_lowDB.js";
import "./utils/lowDB/control/test.js";

// * 创建/挂载Vue实例对象
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
