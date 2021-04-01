export class Preloader extends Phaser.Scene {

    constructor() {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Preloader' );
        
        this.background = null;
        this.preloaderBar = null;
        
        this.ready = false;
    }

    preload() {
        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        this.background = this.add.image( 0,0, 'preloaderBackground' ).setOrigin(0,0);
        this.preloaderBar = this.add.image( this.cameras.main.centerX, this.cameras.main.centerY, 'preloaderBar' );

        //	Crop the `preloaderBar` sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.on( 'progress', function( value ) {
            this.scene.preloaderBar.setCrop( 0, 0, this.scene.preloaderBar.width*value, this.scene.preloaderBar.height );
            });
        this.load.on( 'complete', function() {
            this.scene.preloaderBar.destroy();
            });

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('MainMenu', 'assets/MainMenu.png');
        this.load.image('roomOffice', 'assets/roomOffice.png');
        
        this.load.atlas('officeButton', 'assets/officeButton.png', 'assets/mapLabelsButton.json');
        this.load.atlas('playButton', 'assets/playButton.png', 'assets/mapLabelsButton.json');
        
        this.load.atlas('close', 'assets/close.png', 'assets/itemsButton.json');

        this.load.atlas('envelope', 'assets/envelopeLetterWithStory.png', 'assets/itemsButton.json');
        this.load.atlas('pantheon', 'assets/pantheon.png', 'assets/itemsButton.json');
        this.load.atlas('wolf', 'assets/wolfStatue.png', 'assets/itemsButton.json');

        //	+ lots of other required assets here
        this.load.image('romeStory', 'assets/romeStory.png');
        this.load.image('pantheonImage', 'assets/pantheon.jpg');
        this.load.image('wolfStatueImage', 'assets/wolfStatueImage.jpg');


    }

    create() {
        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloaderBar.setCrop();
        this.scene.start('MainMenu');
    }
}
