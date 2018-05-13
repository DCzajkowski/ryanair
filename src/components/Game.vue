<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script>
    import Phaser from 'phaser'
    import Game from '@/modules/Game'

    export default {
        mounted() {
            var config = {
                    type: Phaser.AUTO,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundColor: '#000000',
                    parent: 'canvas',
                    
                    physics: {
                        default: 'arcade',
                        arcade: {          
                            debug: true,
                        }
                    },
                    scene: [ Game ]
                };

            var game = new Phaser.Game(config);
            }
        }
</script>
