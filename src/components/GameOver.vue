<template>
    <div class="flex h-full justify-center bg-darken">
        <div class="absolute pin-l pin-t -ml-16" @click="$router.push({ name: 'Menu' })">
            <img src="../assets/logo.png">
        </div>

        <div class="flex flex-col items-center mt-48 w-full text-brand-yellow text-3xl text-semibold">
            <div>
                Score: {{ score }}
            </div>
            <div>
                Coins: {{ coinsInGame }}
            </div>
            <div>
                <button type="button" @click="menu" class="w-full bg-brand-yellow p-4 rounded-full uppercase flex justify-center items-center no-underline text-brand-blue text-4xl font-semibold px-8">Go to Menu</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                interval: null,
            }
        },
        computed: {
            score() {
                return this.$store.getters.score
            },
            coinsInGame() {
                return this.$store.getters.coinsInGame
            },
            scoreToMoney() {
                return parseInt(this.$store.getters.score / 1000)
            },
        },
        methods: {
            menu() {
                this.$store.commit('coinsInGame', 0)
            },
        },
        mounted() {
            this.interval = setInterval(() => {
                if (this.score <= 0) {
                    this.$store.commit('addCoins', 1)
                    this.$store.commit('addToScore', -1000)

                    clearInterval(this.interval)
                }
            }, 500)
        },
    }
</script>
