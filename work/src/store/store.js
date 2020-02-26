import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        tempParams: null
    },
    getters: {
        getToken: state => {
            return state.token;
        },
        getTempParams: state => {
            return state.tempParams;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setTempParams(state, temp) {
            state.tempParams = temp;
        }
    }
});

export default store;
