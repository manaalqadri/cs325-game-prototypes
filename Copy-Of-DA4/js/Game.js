export class Game extends Phaser.Scene {

    constructor () {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Game' );
        
        // Create your own variables.
        this.score = 0;
    }
    
    quitGame() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        game.cache = new Phaser.Cache(game);
        game.load.reset();
        game.load.removeAll();

        //  Then let's go back to the main menu.
        this.scene.start( 'MainMenu' );
    }
    
    create() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
       

        for (let i = 0; i < 30; i++)
        {
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);

            this.yellow = this.add.sprite(x, y, 'crate').setInteractive();
        }

        for (let i = 0; i < 30; i++)
        {
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);

           this.blue = this.add.sprite(x, y, 'target').setInteractive();
        }

        for (let i = 0; i < 1; i++)
        {
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);

           this.target = this.add.sprite(x, y, 'target').setInteractive();
        }

        this.target.on( 'pointerdown', function( pointer ) {
            this.scene.cameras.main.shake(500);
            });

        this.input.on('gameobjectup', this.clickHandler, this);
        this.registry.set('score', this.score);
    }

    clickHandler (pointer, box)
    {
        //  Disable our box
        box.input.enabled = false;
        box.setVisible(false);

        if (this.key === 'crate')
        {
            this.score++;
            this.registry.set('score', this.score);
        }
        else
        {
            this.score--;
            this.registry.set('score', this.score);
        }
    }
}

export class SceneB extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'SceneB', active: true });

        this.scoreText;
        this.livesText;
    }

    create ()
    {
        //  Our Text object to display the Score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', color: '#ffffff' });

        //  Check the Registry and hit our callback every time the 'score' value is updated
        this.registry.events.on('changedata', this.updateData, this);
    }

    updateData (parent, key, data)
    {
        if (key === 'score')
        {
            this.scoreText.setText('Score: ' + data);
        }
        else if (key === 'lives')
        {
            this.livesText.setText('Lives: ' + data);
        }
    }
}
