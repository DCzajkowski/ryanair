<template>
    <div id="app" class="bg-sky h-screen font-sans">
        <router-view></router-view>
        <coins></coins>
    </div>
</template>

<script>
    import Coins from '@/components/Coins'

    export default {
        name: 'app',
        components: {
            Coins,
        },
    }
</script>

<style>
    body {
        margin: 0;
    }

    .bg-sky {
        background: url('./assets/bg.png');
    }
</style>

<style src="./styles/app.css"></style>
