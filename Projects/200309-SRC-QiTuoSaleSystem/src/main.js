import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 0.使用Vue路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
import myRoutes from "./routes/routes.js";
const myRouter = new VueRouter(myRoutes);

// 1.使用 vuex
import store from "./store/store";

// 2.Wqao
import "./utils/wqao/wqao-mobile-rem.js"; // 字体自适应
import { WqaoTest } from "./utils/wqao/wqao-test.js"; // 测试语句
Vue.prototype.$test = new WqaoTest(true);

// 3.临时钢材数据库
import { SteelDB, Steel } from "./utils/salesDB/steelDB.js";
Vue.prototype.$SteelDB = new SteelDB();
Vue.prototype.$Steel = Steel;

// *.创建实例
new Vue({
    render: h => h(App),
    router: myRouter,
    store: store
}).$mount("#app");
