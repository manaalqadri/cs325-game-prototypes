import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();

        this.score = 0;
    }
    
    preload() {
        // Load an image and call it 'logo'.
        this.load.image( 'crate', 'assets/hijabimoon-pixel.png');
        this.load.image('target', 'assets/hijabiBLUEmoon-pixel.png');
    }
    
    create() {
        //  Store the score and lives in the Game Registry
        this.registry.set('score', this.score);

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
class SceneB extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'UIScene', active: true });

        this.scoreText;
        this.livesText;
    }

    create ()
    {
        //  Our Text object to display the Score
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', fill: '#ffffff' });

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
const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [MyScene, SceneB],
    });
