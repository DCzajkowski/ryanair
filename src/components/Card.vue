<template>
    <div>
        <img @click="$router.push({ name: 'Menu' })" v-if="a === 1" src="/static/card1.png" class="h-screen w-screen">
        <img @click="$router.push({ name: 'Menu' })" v-else src="/static/zegarek.png" class="h-screen w-screen">
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        data() {
            return {
                a: null,
            }
        },
        mounted() {
            this.a = _.random(1, 2)
        },
    }
</script>
