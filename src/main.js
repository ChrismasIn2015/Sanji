// 1.使用 vuex/vue-router
import router from './router'
import store from './store'

// 2.这个 main.js 同时也是 Electron 的渲染进程
// * 可以通过进程通信调用 ElectronAPI 或者直接调用 NodeAPI
import './utils/lowDB/model/node_lowDB.js'
// ** 20/03/25 Electron 应用不能打包为 Web 应用！会导致 undefined 错误！ **

// 3.导入常用web包
import './utils/rem.js'

// * 创建/挂载Vue实例对象
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
