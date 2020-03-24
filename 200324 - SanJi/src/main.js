// 1.使用 vuex/vue-router
import router from "./router";
import store from "./store";

// 2.引入/创建本地 sqlite 数据库

// * 创建/挂载Vue实例对象
import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
