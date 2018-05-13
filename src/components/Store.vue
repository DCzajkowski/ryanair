<template>
    <div class="flex h-full justify-center bg-darken">
        <div class="absolute pin-l pin-t -ml-16" @click="$router.push({ name: 'Menu' })">
            <img src="../assets/logo.png" class="h-32">
        </div>

        <div class="flex mt-48 w-full">
            <div class="flex-1 flex flex-col justify-center align-center">
                <div class="bg-brand-blue text-white uppercase text-3xl rounded-full py-4 px-8 w-64 flex justify-center mx-auto">
                    planes
                </div>
                <div class="flex-1 flex flex-wrap overflow-hidden">
                    <div class="w-1/2 p-4" v-for="plane in planes" :key="plane.id" @click="buy(plane)">
                        <div class="bg-white rounded-lg w-full h-full flex justify-center items-center relative">
                            <img class="w-64" :src="require(`@/assets/${plane.url}`)">
                            <div class="absolute" v-if="! plane.unlocked">
                                <div class="w-full h-full flex items-center justify-center">
                                    <img src="../assets/lock.png">
                                </div>
                            </div>
                            <div class="absolute pin-b w-full flex items-center justify-center text-brand-yellow text-2xl font-semibold pb-2" v-if="! plane.unlocked">
                                <img src="../assets/coin.png" class="w-4 h-4 mr-2"> <span>{{ plane.price }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-col justify-center align-center">
                <div class="bg-brand-blue text-white uppercase text-3xl rounded-full py-4 px-8 w-64 flex justify-center mx-auto">
                    suitcases
                </div>
                <div class="flex-1 p-4">

                    <div class="bg-white-50 rounded-lg w-full h-full relative">
                        <div class="absolute" style="top: 2rem; left: 2rem;" @click="buyCase(1, 1000)">
                            <img src="/static/walizka_zielona.png" class="w-64">
                        </div>
                        <div class="absolute" style="left: 21rem; top: 2rem;" @click="buyCase(2, 3000)">
                            <img src="/static/walizka_czerwona.png" class="w-64">
                        </div>
                        <div class="absolute" style="top: 16rem; left: 9rem;" @click="buyCase(3, 5000)">
                            <img src="/static/zolta_walizka.png" class="w-64">
                        </div>
                        <div class="absolute flex items-center justify-center text-brand-yellow text-2xl font-semibold p-2 bg-white-50 rounded-full pointer-events-none" style="top: 4.5rem; left: 4.6rem;">
                            <img src="../assets/coin.png" class="w-4 h-4 mr-2"> <span>1000</span>
                        </div>
                        <div class="absolute flex items-center justify-center text-brand-yellow text-2xl font-semibold p-2 bg-white-50 rounded-full pointer-events-none" style="top: 9.5rem; left: 25.4rem;">
                            <img src="../assets/coin.png" class="w-4 h-4 mr-2"> <span>3000</span>
                        </div>
                        <div class="absolute flex items-center justify-center text-brand-yellow text-2xl font-semibold p-2 bg-white-50 rounded-full pointer-events-none" style="top: 22.5rem; left: 14rem;">
                            <img src="../assets/coin.png" class="w-4 h-4 mr-2"> <span>5000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            planes() {
                return this.$store.getters.planes
            },
        },
        methods: {
            buy(plane) {
                if (! plane.unlocked && this.$store.getters.coins >= plane.price) {
                    this.$store.commit('subtractCoins', plane.price)
                    this.$store.commit('unlockPlane', plane)
                }
            },
            buyCase(id, price) {
                if (this.$store.getters.coins >= price) {
                    this.$store.commit('subtractCoins', price)
                    this.$router.push({ name: 'Case', params: { id } })
                }
            },
        },
    }
</script>
