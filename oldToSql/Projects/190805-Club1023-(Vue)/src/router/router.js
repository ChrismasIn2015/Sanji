// 1.  导入变换组件
import index from '../views/index.vue'
import login from '../views/login.vue'
import items from '../views/items.vue'
import good from '../views/good.vue'
import orders from '../views/orders.vue'
// 2.  创建路由明细
const myRoutes = {
    // mode:'history',
    routes:[
        {
            path:'/',
            name:'index',
            component:index,
        },
        {
            path:'/login',
            name:'login',
            component:login,
        },
        {
            path:'/items/:name',
            name:'items',
            component:items,
        },
        {
            path:'/items/:name/:good',
            name:'good',
            component:good,
        },
        {
            path:'/orders/:name',
            name:'orders',
            component:orders,
        },
    ]
}

// 3.   创建vue路由对象
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter(myRoutes);

// 4.  想让main使用路由对象
export default router;