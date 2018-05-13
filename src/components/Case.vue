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
    var redBriefcase;
    var yellowBriefcase;
    var card;
    var chest_opened = false;

    var chests = [];
    let id = null;




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
        
        this.load.image('green_suitcase','/static/green_case.png');
        this.load.image('red_suitcase','/static/red_case.png');
        this.load.image('yellow_suitcase','/static/yellow_case.png');

        this.load.image('bg','/static/bg.png');


        //DZIEMICH

        this.load.spritesheet('greenBriefcaseStylesheet', '/static/animation/greenBriefCaseSpriteSheet.png', {frameWidth:711, frameHeight: 441});
        this.load.spritesheet('redBriefcaseStylesheet', '/static/animation/redBriefCaseSpriteSheet.png', {frameWidth:711, frameHeight: 441});
        this.load.spritesheet('yellowBriefcaseStylesheet', '/static/animation/yellowBriefCaseSpriteSheet.png', {frameWidth:711, frameHeight: 441});

        this.load.spritesheet('ryanairCard', '/static/animation/card.png', {frameWidth:162, frameHeight: 227, endFrame: 100})

    }

    function create() {
        //console.log(this)
        this.add.sprite(width/2,height/2,'bg')

        switch(id){
            case 1:
                chosen_chest = this.physics.add.image(width/2, height/2, 'green_suitcase');
                break;
            case 2:
                chosen_chest = this.physics.add.image(width/2, height/2, 'red_suitcase');
                break;
            case 3:
                chosen_chest = this.physics.add.image(width/2, height/2, 'yellow_suitcase');
                break;
        }
        
    
        //chosen_chest.setInteractive();
        chosen_chest.setVisible(false);
        chosen_chest.setScale(0.4)
        chosen_chest.on('clicked', (chest) => openChest(chest), this);

        switch(id){
            case 1:
                chests = [this.physics.add.image(width/2 - CHEST_SPACING, height/2, 'green_suitcase'), this.physics.add.image(width/2, height/2, 'green_suitcase'), this.physics.add.image(width/2 + CHEST_SPACING, height/2, 'green_suitcase') ]
                break;
            case 2:
                chests = [this.physics.add.image(width/2 - CHEST_SPACING, height/2, 'red_suitcase'), this.physics.add.image(width/2, height/2, 'red_suitcase'), this.physics.add.image(width/2 + CHEST_SPACING, height/2, 'red_suitcase') ]
                break;
            case 3:
                chests = [this.physics.add.image(width/2 - CHEST_SPACING, height/2, 'yellow_suitcase'), this.physics.add.image(width/2, height/2, 'yellow_suitcase'), this.physics.add.image(width/2 + CHEST_SPACING, height/2, 'yellow_suitcase') ]
                break;
        }
       

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
        var greenBriefcaseConfig = {
            key: 'greenBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('greenBriefcaseStylesheet', {start:0, end:10}),
            frameRate: 12,
            
        };
        var redBriefcaseConfig = {
            key: 'redBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('redBriefcaseStylesheet', {start:0, end:10}),
            frameRate: 12,
            
        };
        var yellowBriefcaseConfig = {
            key: 'yellowBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('yellowBriefcaseStylesheet', {start:0, end:10}),
            frameRate: 12,
            
        };
        var ryanairCardConfig = {
            key: 'ryanairCardAnim',
            frames: this.anims.generateFrameNumbers('ryanairCard', {start:0, end:5}),
            frameRate: 8,
        };

        greenBriefcase = this.add.sprite(width/2, height/2, 'greenBriefcaseStylesheet');
        redBriefcase = this.add.sprite(width/2, height/2, 'redBriefcaseStylesheet');
        yellowBriefcase = this.add.sprite(width/2, height/2, 'yellowBriefcaseStylesheet');
        
        card = this.add.sprite(width/2-20, height/2, 'ryanairCard');
        card.setVisible(false)

        greenBriefcase.setVisible(false)
        redBriefcase.setVisible(false)
        yellowBriefcase.setVisible(false)
        
        

        this.anims.create(greenBriefcaseConfig);
        this.anims.create(redBriefcaseConfig);
        this.anims.create(yellowBriefcaseConfig);
        this.anims.create(ryanairCardConfig);

        greenBriefcase.on('animationcomplete', startCard);
        redBriefcase.on('animationcomplete', startCard);
        yellowBriefcase.on('animationcomplete', startCard);
    }

    function update (){

        if(has_been_clicked){
            for (var i = chests.length - 1; i >= 0; i--) {
                if(chests[i].body.velocity.y == 0)
                {
                    if(Math.abs(width/2 - (chests[i].body.position.x + chests[i].displayWidth/2)) < 30)
                    {
                            chests[i].setVelocityX(0);
                            chosen_chest.setVisible(true);
                            chosen_chest.setInteractive();
                            chests[i].setVisible(false)
                            has_been_clicked = false;       
                    }
                }
            }   
        }
    }
    function openChest (chest){
        chosen_chest.input.enabled = false;
        chosen_chest.setInteractive(false);
        chosen_chest.setVisible(false)
        
        chest_opened = true;
        switch(id){
            case 1:
                greenBriefcase.setVisible(true)
                greenBriefcase.anims.play('greenBriefcaseAnim').setScale(0.4);
                break;
            case 2:
                redBriefcase.setVisible(true)
                redBriefcase.anims.play('redBriefcaseAnim').setScale(0.4);
                break;
            case 3:
                yellowBriefcase.setVisible(true)
                yellowBriefcase.anims.play('yellowBriefcaseAnim').setScale(0.4);
                break;

        }
        
        }

    function startCard() {
        card.setVisible(true);
        card.anims.play('ryanairCardAnim');
        card.setInteractive();
        card.on('clicked', (chest) =>{
            window.vm.$router.push({ name: 'Card' })
        });
    }

    export default {
        methods: {
            //
        },
        created() {
            id = this.$route.params.id
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
