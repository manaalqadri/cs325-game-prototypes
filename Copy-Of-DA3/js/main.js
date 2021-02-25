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
        this.load.image('star', 'assets/coins.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 321, frameHeight: 400 });
        this.load.image('bg', 'assets/bkgd.png');
        this.load.image('sun', 'assets/sun.png');
        this.load.image('clouds', 'assets/clouds.png');
        this.load.image('cave', 'assets/skullocto.png');
    }
    
    create() 
    {
        this.cameras.main.setBounds(1, 1, 6000, 600);
        this.physics.world.setBounds(0, 0, 6000, 600);

        this.add.image(0, 0, 'bg').setOrigin(0).setScrollFactor(0);
        this.add.image(0, 0, 'sun').setOrigin(0).setScrollFactor(0.1);
        this.add.image(0, 0, 'clouds').setOrigin(0).setScrollFactor(0.45);
        this.add.image(5510, 0, 'cave').setOrigin(0);

        platforms = this.physics.add.staticGroup();
        platforms.create(3000, 600, 'ground').refreshBody();
        
  
        // Animation set
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0 ] }),
            frameRate: 10,
        });

        player = this.physics.add.sprite(200, 540, 'player');
        player.body.setGravityY(300);
        player.body.setSize(player.width-200, player.height-370);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        
        player.play('walk');
        cursors = this.input.keyboard.createCursorKeys();

        this.add.image(3000,600, 'ground');
        this.add.image(3000,550, 'ground');
        this.add.image(3000,500, 'ground');
        this.add.image(3000,450, 'ground');

        

        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.followOffset.set(-300, 0);
    }
    
    update() 
    {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-200);

            player.anims.play('walk', true);
            player.flipX = true;
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(200);

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
var coins;
