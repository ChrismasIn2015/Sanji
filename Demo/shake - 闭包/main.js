import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import { modules } from './store/stores'

Vue.config.productionTip = false

App.mpType = 'app'

const store = new Vuex.Store(modules)

const app = new Vue({
    ...App,
	store
})
app.$mount()
