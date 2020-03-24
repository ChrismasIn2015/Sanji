// 1.  导入变换组件
import routerIndex from "@/views/routerIndex.vue";
import canvas from "@/views/SPA/canvas.vue";
import tree from "@/views/SPA/tree.vue";
import doc from "@/views/SPA/doc.vue";

// 2.  创建路由明细
const myRoutes = {
    mode: "history",
    routes: [
        {
            path: "/",
            name: "routerIndex",
            component: routerIndex
        },
        {
            path: "/canvas",
            name: "canvas",
            component: canvas
        },
        {
            path: "/tree",
            name: "tree",
            component: tree
        },
        {
            path: "/doc",
            name: "doc",
            component: doc
        }
    ]
};

// 3.   创建vue路由对象
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 4.  想让main使用路由对象
export default new VueRouter(myRoutes);
