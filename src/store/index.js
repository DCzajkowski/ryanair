import Vue from 'vue'

Vue.config.devtools = true

import _ from 'lodash'

import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
    plugins: [
        createPersistedState(),
    ],
    state: {
        coins: 300000,
        coinsInGame: 0,
        planes: [
            { id: 1, url: 'plane-ryanair.png', price: 100, unlocked: true },
            { id: 2, url: 'plane-blue.png', price: 200, unlocked: false },
            { id: 3, url: 'plane-red.png', price: 300, unlocked: false },
            { id: 4, url: 'plane-purple.png', price: 200, unlocked: false },
        ],
        score: 0,
        // products: [
        //     {
        //         id: 1,
        //         name: 'Chips',
        //         oldPrice: '$3',
        //         newPrice: '$2.7',
        //         image: 'https://i.imgur.com/8L9oQvg.png',
        //         qr: 'https://i.imgur.com/hDxZELh.png',
        //     },
        // ],
    },
    mutations: {
        coins(state, coins) {
            state.coins = coins
        },
        score(state, score) {
            state.score = score
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
        addCoinInGame(state) {
            state.coinsInGame += 1
        },
        addCoins(state, amount) {
            state.coins += amount
        },
        addCoinsInGame(state, amount) {
            state.coinsInGame += amount
        },
        addToScore(state, score) {
            if (state.score + score >= 0) {
                state.score += score
            } else {
                state.score = 0
            }
        },
        addScore(state) {
            state.score += 10
        },
        coinsInGame(state, coins) {
            state.coinsInGame = coins
        },
    },
    getters: {
        coins(state) {
            return state.coins
        },
        planes(state) {
            return state.planes
        },
        score(state) {
            return state.score
        },
        // randomProduct(state) {
        //     return state.products[_.random(0, state.products.length - 1)]
        // },
        coinsInGame(state) {
            return state.coinsInGame
        },
    },
})
