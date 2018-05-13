import Vue from 'vue'

Vue.config.devtools = true

import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
    plugins: [
        createPersistedState(),
    ],
    state: {
        coins: 300,
        planes: [
            { id: 1, url: 'plane-ryanair.png', price: 100, unlocked: true },
            { id: 2, url: 'plane-blue.png', price: 200, unlocked: false },
            { id: 3, url: 'plane-red.png', price: 300, unlocked: false },
            { id: 4, url: 'plane-purple.png', price: 200, unlocked: false },
        ],
    },
    mutations: {
        coins(state, coins) {
            state.coins = coins
        },
        subtractCoins(state, coins) {
            state.coins -= coins
        },
        unlockPlane(state, plane) {
            plane.unlocked = true
        },
        addCoin(state) {
            state.coins += 1
        },
    },
    getters: {
        coins(state) {
            return state.coins
        },
        planes(state) {
            return state.planes
        },
    },
})
