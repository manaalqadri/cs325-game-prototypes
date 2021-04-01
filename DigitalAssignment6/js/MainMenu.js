import {Button} from './Button.js';

export class MainMenu extends Phaser.Scene {

    constructor () {
        super( 'MainMenu' );
        
	    this.playButton = null;
	}
    
    create() {
        this.add.sprite( 0, 0, 'MainMenu' ).setOrigin(0,0);
        
        this.playButton = new Button( this, 50, 550, 'playButton', this.startGame, this, 'over', 'out', 'down' );
    }

    // The callback for the button.
    startGame() {

        //	And start the actual game
        this.scene.start( 'Game' );
    }
    
}
