import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: null,
        OpenId: null,
        tempParams: null
    },
    getters: {
        getToken: state => {
            return state.token;
        },
        getOpenId: state => {
            return state.OpenId;
        },
        getTempParams: state => {
            return state.tempParams;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setOpenId(state, OpenId) {
            state.OpenId = OpenId;
        },
        setTempParams(state, temp) {
            state.tempParams = temp;
        }
    }
});

export default store;
