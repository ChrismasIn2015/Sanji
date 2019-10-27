// 1.  导入变换组件
import canvas from '@/views/canvas.vue'
import tree from '@/views/tree.vue'
import index from '@/views/index.vue'
// 2.  创建路由明细
const myRoutes = {
    mode:'history',
    routes:[
        {
            path:'/',
            name:'index',
            component:index,
        },
        {
            path:'/canvas',
            name:'canvas',
            component:canvas,
        },
        {
            path:'/tree',
            name:'tree',
            component:tree,
        }
    ]
}

// 3.   创建vue路由对象
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter(myRoutes);

// 4.  想让main使用路由对象
export default router;