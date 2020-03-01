import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        modalShow: null,
        tempParams: null
    },
    getters: {
        getModalShow: state => {
            return state.modalShow;
        },
        getTempParams: state => {
            return state.tempParams;
        }
    },
    mutations: {
        setModalShow(state, modalShow) {
            state.modalShow = modalShow;
        },
        setTempParams(state, temp) {
            state.tempParams = temp;
        }
    }
});

export default store;
