<template>
    <div id="app" class="bg-sky h-screen font-sans">
        <router-view></router-view>
        <score></score>
    </div>
</template>

<script>
    import Score from '@/components/Score'

    export default {
        name: 'app',
        components: {
            Score,
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
