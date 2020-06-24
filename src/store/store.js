import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

export const store = new Vuex.Store({
    state: {
        funds: 0,
        stockList: [],
    },
    getters: {
        getFunds: state => {
            return state.funds;
        },
        getStockList: state => {
            return state.stockList;
        },
    },
    mutations: {
        setFunds: (state, payload) => {
            state.funds = payload;
        },
        setStockList: (state, payload) => {
            state.stockList = payload;
        },
    },
    actions: {
        loadState: ({ commit }, payload) => {
            Vue.http.get('state.json')
                .then(response => {
                    commit('setFunds', response.body.funds);
                    commit('setStockList', response.body.stockList);
                });
        },
        saveState: ({ getters }) => {
            const newState = {
                funds: getters.getFunds,
                stockList: getters.getStockList,
            };
            Vue.http.put('state.json', newState)
                .then(response => {
                });
        },
        cheatLoadState: ({ commit }, payload) => {
            Vue.http.get('cheatState.json')
                .then(response => {
                    commit('setFunds', response.body.funds);
                    commit('setStockList', response.body.stockList);
                });
        },
        cheatSaveState: ({ getters }) => {
            const newCheatState = {
                funds: getters.getFunds,
                stockList: getters.getStockList,
            };
            Vue.http.put('cheatState.json', newCheatState)
                .then(response => {
                });
        },
        randomizePrices: ({ getters, }) => {
            let auxStockList = getters.getStockList;
            for (let i=0; i<auxStockList.length; i++) {
                let max = auxStockList[i].price + 10;
                let min = auxStockList[i].price - 10;
                auxStockList[i].price = Math.floor(Math.random() * (max - min + 1) + min);
            } 
        }
    }
});