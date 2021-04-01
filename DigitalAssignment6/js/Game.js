import {Button} from './Button.js';

export class Game extends Phaser.Scene {

    constructor () {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Game' );
        
        // Create your own variables.
        var romeStory;
    }
    
    quitGame() 
    {

        this.scene.start( 'MainMenu' );
    }
    
    create() 
    {
        this.add.image(0, 0, 'roomOffice').setOrigin(0);

        this.openLetter = new Button( this, 300, 310, 'envelope', this.openEnvelope, this, 'over', 'out', 'down' );
        this.wolf = new Button( this, 80, 200, 'wolf', this.openWolf, this, 'over', 'out', 'down' );
        this.pantheon = new Button( this, 230, 240, 'pantheon', this.openPantheon, this, 'over', 'out', 'down' );
        this.lily = new Button( this, 400, 270, 'lilyVase', this.openLily, this, 'over', 'out', 'down' );
    }

    openEnvelope()
    {
        this.romeStory = this.add.image(400, 300, 'romeStory');
        this.closeButton = new Button( this, 580, 50, 'close', this.closeEnvelope, this, 'over', 'out', 'down' );        
    }
    closeEnvelope()
    {
        this.romeStory.x = 1000;
        this.closeButton.x = 900;
    }


    openWolf()
    {
        this.wolf = this.add.image(400, 300, 'wolfStatueImage');
        this.closeButton = new Button( this, 580, 50, 'close', this.closeWolf, this, 'over', 'out', 'down' );        
    }
    closeWolf()
    {
        this.wolf.x = 10000;
        this.closeButton.x = 900;
    }


    openPantheon()
    {
        this.pantheon = this.add.image(400, 300, 'pantheonImage');
        this.closeButton = new Button( this, 580, 50, 'close', this.closePantheon, this, 'over', 'out', 'down' );        
    }
    closePantheon()
    {
        this.pantheon.x = 10000;
        this.closeButton.x = 900;
    }

    openLily()
    {
        this.lily = this.add.image(400, 300, 'lilyImage');
        this.closeButton = new Button( this, 580, 50, 'close', this.closeLily, this, 'over', 'out', 'down' );        
    }
    closeLily()
    {
        this.lily.x = 10000;
        this.closeButton.x = 900;
    }

    
    /*openCage()
    {
        this.cage = this.add.image(400, 300, 'lilyImage');
        this.closeButton = new Button( this, 580, 50, 'close', this.closeLily, this, 'over', 'out', 'down' );        
    }
    closeCage()
    {
        this.cage.x = 10000;
        this.closeButton.x = 900;
    }*/

    update() {

    }
}
