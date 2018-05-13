<template>
    <div class="absolute pin-t pin-r py-4 px-8 mr-8 text-brand-yellow text-3xl text-semibold flex justify-center items-center bg-white-50 rounded-lg rounded-t-none">
        <span class="mr-8" v-if="$route.name === 'Game'">Score: <span class="w-32 inline-block">{{ score }}</span></span>
        <img src="../assets/coin.png" class="w-8 h-8 mr-3"> {{ coins }}
    </div>
</template>

<script>
    export default {
        computed: {
            coins() {
                return parseInt(this.$route.name === 'Game' ? this.$store.getters.coinsInGame : this.$store.getters.coins)
            },
            score() {
                return parseInt(this.$store.getters.score)
            },
        },
    }
</script>
