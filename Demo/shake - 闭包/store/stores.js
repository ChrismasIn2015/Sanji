import Vue from 'vue'
import Vuex from 'vuex'
import shake from './modules/shake'

Vue.use(Vuex)

export const store =  {
	modules: {
		shake
	}
}

export default store
