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

class MyScene extends Phaser.Scene 
{
    
    constructor() 
    {
        super();
    }
    
    preload() 
    {
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 40, frameHeight: 54 });
        this.load.image('bkgd', 'assets/bkgd.png');
    }
    
    create() 
    {
        this.add.image(400, 300, 'bkgd');


        platforms = this.physics.add.staticGroup();
        platforms.create(400, 600, 'ground').refreshBody();
        platforms.create(400, 550, 'ground').refreshBody();
        platforms.create(400, 500, 'ground').refreshBody();        


        platforms.create(900, 350, 'ground').refreshBody();   
        platforms.create(-100, 250, 'ground').refreshBody();   
        platforms.create(80, 100, 'ground').refreshBody();   
        platforms.create(1000, 175, 'ground').refreshBody();   

        // Animation set
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 80] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 9 ] }),
            frameRate: 10,
        });

        player = this.physics.add.sprite(100, 450, 'player');
        player.body.setGravityY(300)
        player.body.setSize(player.width, player.height-8);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        player.play('walk');

        cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() 
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('walk', true);
            player.flipX = true;
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('walk', true);
            player.flipX = false;
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('idle');
        }

        if (cursors.up.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-330);
        }
    }
}

const game = new Phaser.Game(
{
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
});

var platforms;
var player;
var cursors;
