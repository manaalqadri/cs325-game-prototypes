export class Game extends Phaser.Scene {

    constructor () {
        // The parameter to super() is the name used when switching states,
        // as in `this.scene.start(...)`.
        super( 'Game' );
        
        // Create your own variables.
        this.scoreText;
        this.livesText;

        this.score = 0;
    }
    quitGame() 
    {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.scene.start( 'MainMenu' );
    }

    gameOver() 
    {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.gameOverScreen = this.physics.add.staticGroup();
        
        this.gameOverScreen.create(400, 300, 'gameOver').refreshBody();

        this.gameOverScreen.setInteractive();
        this.gameOverScreen.on( 'pointerdown', function( pointer ) {
            this.scene.quitGame();
            },
        );
    }

    gameWin() 
    {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.gameWinScreen = this.physics.add.staticGroup();
        
        this.gameWinScreen.create(400, 300, 'gameWin').refreshBody();

        this.gameWinScreen.setInteractive();
        this.gameWinScreen.on( 'pointerdown', function( pointer ) {
            this.scene.quitGame();
            },
        );
    }

   
    
    create() 
    {
        this.add.image( 0, 0, 'bkgd' ).setOrigin(0,0);
        for (let i = 0; i < 30; i++)
        {
            let xPos = Phaser.Math.Between(70, 770);
            let yPos = Phaser.Math.Between(50, 560);

            this.yellow = this.add.sprite(xPos, yPos, 'crate').setInteractive();
        }

        for (let i = 0; i < 30; i++)
        {
            let xPos = Phaser.Math.Between(70, 770);
            let yPos = Phaser.Math.Between(50, 560);

           this.blue = this.add.sprite(xPos, yPos, 'target').setInteractive();
        }

        for (let i = 0; i < 1; i++)
        {
            let xPos = Phaser.Math.Between(0, 0);
            let yPos = Phaser.Math.Between(0, 0);

            if(xPos % 2 == 0)
            {
                this.target = this.add.sprite(xPos, yPos, 'target').setInteractive();
            }
            else
            {
                this.target = this.add.sprite(xPos, yPos, 'crate').setInteractive();
            }
        }



        this.input.on('gameobjectup', this.clickHandler, this);
        this.registry.set('score', this.score);
        
        this.scoreText = this.add.text(20, 20, 'Score: 0', { font: '32px Arial', color: '#ffffff' });

        //  Check the Registry and hit our callback every time the 'score' value is updated
        this.registry.events.on('changedata', this.updateData, this);
        
        this.target.on( 'pointerdown', function( pointer ) {
            this.scene.cameras.main.shake(500);
            this.scene.gameOver();
            this.score--;
            });
    }

    clickHandler (pointer, box)
    {
        //  Disable our box
        box.input.enabled = false;
        box.setVisible(false);

        this.score++;
        this.registry.set('score', this.score);


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
