// 1.使用 vuex/vue-router
import router from './router'
import store from './store'

// 2.调用 Node 模块启动数据库服务
import './utils/lowDB/model/node_lowDB.js'

// 3.启用自适应样式
import './utils/rem.js'

// 4.导入SanJi的函数式UI
import { $sjConfirm, $sjTip } from './utils/sanJi-UI/sjRender.js'
Vue.prototype.$confirm = $sjConfirm
Vue.prototype.$tip = $sjTip

// * 创建/挂载Vue实例对象
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
