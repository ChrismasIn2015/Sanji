import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 0.使用Vue路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
import myRoutes from "./routes/routes.js";
const myRouter = new VueRouter(myRoutes);
// myRouter.beforeEach((to, from, next) => {
//     // 1.如果前往非登录页面 则需要Token 否则需要登录
//     let nowToken = localStorage.getItem("qrCodeToken");
//     if (nowToken === "null") {
//         localStorage.setItem("qrCodeToken", "");
//         nowToken = "";
//     }
//     if (nowToken) {
//         next();
//     } else {
//         // 0.如果前往登录页面/结果 则直接通过
//         if (to.path === "/" || to.path === "/login") {
//             next();
//         } else {
//             next("/login");
//         }
//     }
// });

// 1.使用 vuex
import store from "./store/store";

// 2.Wqao
import "./utils/wqao/wqao-mobile-rem.js"; // 字体自适应
import { WqaoTest } from "./utils/wqao/wqao-test.js"; // 测试语句
Vue.prototype.$test = new WqaoTest(true);

// *.创建实例
new Vue({
    render: h => h(App),
    router: myRouter,
    store: store
}).$mount("#app");
