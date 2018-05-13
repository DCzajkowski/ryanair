<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script>
    import Phaser from 'phaser'

    const CHEST_SPACING = 500;
    const CHEST_FALLING_SPEED = 400;
    const CHEST_GOTO_CENTER_SPEED = 100;


    var width = 1920;
    var height = 1080;
    var has_been_clicked = false;

    let chosen_chest;

    var chests = [];

    function clickHandler (chests, chest)
    {
        // console.log(chests);

        chest.off('clicked', clickHandler);
        //chest.input.enabled = false;

        has_been_clicked = true;



         // console.log(chest, other1, other2)

         for (var i = chests.length - 1; i >= 0; i--) {
            
            chests[i].setVelocityY(CHEST_FALLING_SPEED  + ( Math.random() - 0.5)  * 300 )
            
          
         }

         chest.setVelocityY (0);

        
        // other1.setVelocityY( CHEST_FALLING_SPEED  + ( Math.random() - 0.5)  * 300 );
        // other2.setVelocityY( CHEST_FALLING_SPEED );


        //console.log(chest.body.position.x)
        chest.setVelocityX( width/2 - chest.body.position.x)
    }

    function preload() {
        this.load.image('suitcase1','/static/green_case.png');
        this.load.image('bg','/static/bg.png');

    }

    function create() {
        //console.log(this)
        this.add.sprite(1920/2,1080/2,'bg')

        chosen_chest = this.physics.add.image(width/2, height/2 + 100, 'suitcase1');
        //chosen_chest.setInteractive();
        chosen_chest.setVisible(false);
        chests = [this.physics.add.image(width/2 - CHEST_SPACING, height/2 + 100, 'suitcase1'), this.physics.add.image(width/2, height/2 + 100, 'suitcase1'), this.physics.add.image(width/2 + CHEST_SPACING, height/2 + 100, 'suitcase1') ]

        for (var i = chests.length - 1; i >= 0; i--) {
            chests[i].setInteractive();
            chests[i].on('clicked', (chest) => clickHandler(chests, chest), this);
            chests[i].setScale(0.5,0.5)
        }
        console.log(chests[1])

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
    }

    function update ()
    {
        
        
        if(has_been_clicked)
        {

            for (var i = chests.length - 1; i >= 0; i--) {
                //console.log(chests[i])
                if(chests[i].body.velocity.y == 0)
                {
                //console.log(chests[i].body.position.x)

                    if(Math.abs(width/2 - (chests[i].body.position.x + chests[i].displayWidth/2)) < 10)
                    {
                        if(chests[i].body.velocity.x != 0)
                        {
                            chests[i].setScale(0.8);
                        }
                        else
                        {
                            chests[i].setScale(1.1);
                        }
                        chests[i].setVelocityX(0);
                        chests[i].setPosition(width/2, height/2 + 100)
                    }
                }
            }   
        }
    }

    export default {
        methods: {
            //
        },
        mounted() {
            const game = new Phaser.Game({
                type: Phaser.AUTO,
                width: window.innerWidth * window.devicePixelRatio,
                height: window.innerHeight * window.devicePixelRatio,
                //width: ,
                //height: 1080,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 }
                    }
                },
                parent: 'canvas',
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            })


            // console.log(this.$route.params.id) // 1 - słaby, 2 - lepszy, 3 - premium
        }
    }
</script>
