import {Button} from './Button.js';

export class Game extends Phaser.Scene {

    constructor () {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Game' );
        
        // Create your own variables.
        this.stickH = null;
        this.ball = null;
        this.board = null;
    }
    
    quitGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.scene.start( 'MainMenu' );
    }
    
    create() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(16, 16, 'blueG').setOrigin(0);
        this.add.image(575, 495, 'orangeG').setOrigin(0);

        this.physics.world.setBounds(0, 0, 800, 600);

        this.board = this.physics.add.staticGroup();
        for (var i = 16; i < 700; i+=80)
        {
            //this.board.create(i, 16, 'board').refreshBody();
            for (var j = 16; j < 600; j+=80)
            {
                this.board.create(i, j, 'board').refreshBody();
            }
        }

        this.stickH = this.physics.add.staticGroup();
        this.stickV = this.physics.add.staticGroup();

        for(var numberOfBorders = 0; numberOfBorders < 20; numberOfBorders++)
        {
            this.stickH = new Button( this, 725, 250, 'stickH', this,).setInteractive();
            this.stickV = new Button( this, 725, 325, 'stickV', this,).setInteractive();
        }
        this.ball = new Button( this, 380, 380, 'ball', this, 'over', 'out', 'down' ).setInteractive();

        this.input.setDraggable(this.stickH);
        this.input.setDraggable(this.stickV);
        this.input.setDraggable(this.ball);

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });


        this.physics.add.collider(this.stickH, this.ball);
        this.physics.add.collider(this.stickV, this.ball);
        
    }

    update() {

    }
}
