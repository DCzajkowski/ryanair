<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script>
    import Phaser from 'phaser'

    export default {
        methods: {
            preload() {
                //
            },
            create() {
                //
            },
        },
        mounted() {
            const game = new Phaser.Game({
                parent: 'canvas',
                type: Phaser.AUTO,
                // width: window.innerWidth * window.devicePixelRatio,
                // height: window.innerHeight * window.devicePixelRatio,
                width: 1280,
                height: 720,
                backgroundColor: '#000000',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 },
                    },
                },
                scene: {
                    preload: this.preload,
                    create: this.create,
                },
            })
        }
    }
</script>
