<template>
    <div class="flex h-full justify-center bg-darken">
        <div class="absolute pin-l pin-t -ml-16" @click="$router.push({ name: 'Menu' })">
            <img src="../assets/logo.png" class="h-32">
        </div>

        <div class="flex flex-col items-center mt-48 w-full text-brand-yellow text-semibold" style="font-size: 5rem;">
            <div>
                Score: {{ score }}
            </div>
            <div class="mb-8">
                Coins: {{ coinsInGame }}
            </div>
            <div>
                <button type="button" @click="menu" class="w-full bg-brand-yellow p-4 rounded-full uppercase flex justify-center items-center no-underline text-brand-blue text-4xl font-semibold px-8">Go to Menu</button>
            </div>
        </div>
    </div>
</template>

<script>
    const FRAMES_PER_TIME = 36
    const TIME = 3000

    export default {
        data() {
            return {
                interval: null,
            }
        },
        computed: {
            score() {
                return parseInt(this.$store.getters.score)
            },
            coinsInGame() {
                return parseInt(this.$store.getters.coinsInGame)
            },
            scoreToMoney() {
                return parseInt(this.$store.getters.score / 1000)
            },
        },
        methods: {
            menu() {
                this.$router.push({ name: 'Menu' })
            },
            coinsInGameToCoins() {
                const coinsToAddEveryFrame = this.coinsInGame / FRAMES_PER_TIME

                this.interval = setInterval(() => {
                    if (this.coinsInGame <= 0) {
                        this.$store.commit('coinsInGame', 0)
                        clearInterval(this.interval)
                        return
                    }

                    this.$store.commit('addCoinsInGame', -coinsToAddEveryFrame)
                    this.$store.commit('addCoins', coinsToAddEveryFrame)
                }, TIME / FRAMES_PER_TIME)
            },
        },
        mounted() {
            const toSubtractEveryFrame = this.score / FRAMES_PER_TIME
            const coinsToAddEveryFrame = this.score / 1000 / FRAMES_PER_TIME

            let i = 0

            this.interval = setInterval(() => {
                if (i > FRAMES_PER_TIME || this.score <= 0) {
                    this.$store.commit('score', 0)
                    clearInterval(this.interval)
                    this.coinsInGameToCoins()
                    return
                }

                this.$store.commit('addToScore', -toSubtractEveryFrame)
                this.$store.commit('addCoins', coinsToAddEveryFrame)
            }, TIME / FRAMES_PER_TIME)
        },
    }
</script>
