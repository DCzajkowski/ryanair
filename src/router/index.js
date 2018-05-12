import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Game from '@/components/Game'
import Store from '@/components/Store'
import Case from '@/components/Case'

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
        {
            path: '/store',
            name: 'Store',
            component: Store,
        },
        {
            path: '/case/:id',
            name: 'Case',
            component: Case,
        },
    ],
})
