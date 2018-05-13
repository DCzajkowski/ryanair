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
                width: window.innerWidth,
                height: window.innerHeight,
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

            // console.log(this.$route.params.id) // 1 - słaby, 2 - lepszy, 3 - premium
        }
    }
</script>
