<template>
    <div>
        <div id="canvas"></div>
    </div>
</template>

<script>
    import Phaser from 'phaser'

    const CHEST_SPACING = 200;
    const CHEST_FALLING_SPEED = 80;
    const CHEST_GOTO_CENTER_SPEED = 100;


    var width = 667;
    var height = 375;
    var has_been_clicked = false;

    let chosen_chest;
    var greenBriefcase;
    var card;

    var chests = [];





    function clickHandler (chests, chest)
    {
        // console.log(chests);

        chest.off('clicked', clickHandler);
        chest.input.enabled = false;

        has_been_clicked = true;



         // console.log(chest, other1, other2)

         for (var i = chests.length - 1; i >= 0; i--) {
            
            chests[i].setVelocityY(CHEST_FALLING_SPEED  + ( Math.random() - 0.5)  * 100 )
            
          
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


        //DZIEMICH

        this.load.spritesheet('greenBriefcaseStylesheet', '/static/animation/greenBriefCaseSpriteSheet.png', {frameWidth:711, frameHeight: 441, endFrame: 100});
        this.load.spritesheet('ryanairCard', '/static/animation/card.png', {frameWidth:162, frameHeight: 227, endFrame: 100})

    }

    function create() {
        //console.log(this)
        this.add.sprite(width/2,height/2,'bg')

        chosen_chest = this.physics.add.image(width/2, height/2 + 50, 'suitcase1');
        //chosen_chest.setInteractive();
        chosen_chest.setVisible(false);
        chosen_chest.setScale(0.4)
        chosen_chest.on('clicked', (chest) => openChest(chest), this);


        chests = [this.physics.add.image(width/2 - CHEST_SPACING, height/2 + 50, 'suitcase1'), this.physics.add.image(width/2, height/2 + 50, 'suitcase1'), this.physics.add.image(width/2 + CHEST_SPACING, height/2 + 50, 'suitcase1') ]

        for (var i = chests.length - 1; i >= 0; i--) {
            chests[i].setInteractive();
            chests[i].on('clicked', (chest) => clickHandler(chests, chest), this);
            chests[i].setScale(0.15,0.15)
        }
        // console.log(chests[1])

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        //DZIEMICH
        var briefcaseConfig = {
            key: 'greenBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('greenBriefcaseStylesheet', {start:0, end:100}),
            frameRate: 12,
            
        };


        
        var ryanairCardConfig = {
            key: 'ryanairCardAnim',
            frames: this.anims.generateFrameNumbers('ryanairCard', {start:0, end:5}),
            frameRate: 8,
        };

        greenBriefcase = this.add.sprite(width/2, height/2+50, 'greenBriefcaseStylesheet');
        card = this.add.sprite(width/2, height/2 + 50, 'ryanairCard');
        card.setVisible(false)
        greenBriefcase.setVisible(false)

        this.anims.create(briefcaseConfig);
        this.anims.create(ryanairCardConfig);


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

                    if(Math.abs(width/2 - (chests[i].body.position.x + chests[i].displayWidth/2)) < 30)
                    {
                        // if(chests[i].body.velocity.x != 0)
                        // {
                        //     chests[i].setScale(0.8);
                        // }
                        // else
                        // {
                            chests[i].setVelocityX(0);
                            //chests[i].setPosition(width/2, height/2 + 100)
                            //chests[i].setScale(1.1);
                            chosen_chest.setVisible(true);
                            chosen_chest.setInteractive();
                            
                            chests[i].setVisible(false)
                        // }
                        
                    }
                    
                    //has_been_clicked = false;
        // card.anims.play('ryanairCardAnim');
        
        // card.setInteractive();
        // card.on('clicked', (chest) =>{
        //     console.log('card clicked');
        // });

        // this.input.on('gameobjectup', (pointer, gameObject)=>{
        //     gameObject.emit('clicked', gameObject);
        // });
                
                // console.log(greenBriefcase);
                // greenBriefcase.on('animationcomplete', startCard);
                // greenBriefcase.anims.play('greenBriefcaseAnim').setScale(4);
                }
            }   
        }
    }
        function openChest (chest)
    {

        chest.off('clicked', openChest);
        chest.input.enabled = false;
        chest.setVisible(false)
        console.log("otowrz")
        greenBriefcase.setVisible(true)
        
        console.log('aaaaaaa')
        greenBriefcase.on('animationcomplete', startCard);
        greenBriefcase.anims.play('greenBriefcaseAnim').setScale(0.4);

         //odpalic animacie Dziemicha


    }
    function startCard() {
        card.setVisible(true);
        card.anims.play('ryanairCardAnim');
        card.setInteractive();
        card.on('clicked', (chest) =>{
            console.log('card clicked');
        });
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
