import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Menu',
            component: Menu,
        },
        {
            path: '/play',
            name: 'Game',
            component: Game,
        },
    ],
})
