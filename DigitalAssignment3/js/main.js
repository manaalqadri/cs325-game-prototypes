import "./phaser.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var coins;
var platforms;
var coinPlatforms;
var cursors;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/bkgd.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('coinPlatform', 'assets/coinPlatform.png');
    this.load.image('coins', 'assets/coins.png');
    this.load.spritesheet('dude', 'assets/player.png', { frameWidth: 321, frameHeight: 263 });
    this.load.image('sun', 'assets/sun.png');
    this.load.image('clouds', 'assets/clouds.png');
    this.load.image('cave', 'assets/skullocto.png');
}

function create ()
{
    //Camera and World Bounds
    this.cameras.main.setBounds(1, 1, 6000, 600);
    this.physics.world.setBounds(0, 0, 6000, 600);

    


    //Background creationg - Parallax with sky, sun, and clouds
    this.add.image(0, 0, 'sky').setOrigin(0).setScrollFactor(0);
    this.add.image(0, 0, 'sun').setOrigin(0).setScrollFactor(0.1);
    this.add.image(0, 0, 'clouds').setOrigin(0).setScrollFactor(0.45);
    this.add.image(5510, 0, 'cave').setOrigin(0);




    //  Platforms with group declarations
    platforms = this.physics.add.staticGroup();
    coinPlatforms = this.physics.add.staticGroup();

    platforms.create(3000, 600, 'ground').refreshBody();




    // Player Creation with physics
    player = this.physics.add.sprite(200, 540, 'dude');
    player.body.setSize(player.width-200, player.height-50);
    
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //Player Animations - Walk and Idle
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });




    //  Keyboard Definitions
    cursors = this.input.keyboard.createCursorKeys();




    //  Hidden platform for Coins only
    for (var i = 200; i < 5200; i+=50)
    {
        if(i%400 == 0)
        {  
            coinPlatforms.create(i, 200, 'coinPlatform').refreshBody();
            coinPlatforms.create(i, 250, 'coinPlatform').refreshBody();
            i = i+1000;
            
        }
        coinPlatforms.create(i, 200, 'coinPlatform').refreshBody();
        coinPlatforms.create(i, 250, 'coinPlatform').refreshBody();
    }

    
    for (var i = 600; i < 5000; i+=100)
    {
        if(i%400 == 0)
        {  
            coinPlatforms.create(i, 200, 'coinPlatform').refreshBody();
            coinPlatforms.create(i+50, 250, 'coinPlatform').refreshBody();
            coinPlatforms.create(i, 300, 'coinPlatform').refreshBody();
            i = i+1000;
            
        }
        coinPlatforms.create(i, 200, 'coinPlatform').refreshBody();
        coinPlatforms.create(i+50, 250, 'coinPlatform').refreshBody();
        coinPlatforms.create(i, 300, 'coinPlatform').refreshBody();
    }
    
    //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    coins = this.physics.add.group({
        key: 'coins',
        /*repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }*/
    });

    for (var i = 200; i < 6000; i+=50)
    {
        if(i%400 == 0)
        {  
            coins.create(i, 150, 'coins');
            coins.create(i, 200, 'coins');
            i = i+1000;
            
        }
        coins.create(i, 150, 'coins');
        coins.create(i, 200, 'coins');
    }
    
    for (var i = 600; i < 5000; i+=100)
    {
        if(i%400 == 0)
        {  
            coins.create(i, 150, 'coins');
            coins.create(i+50, 200, 'coins');
            coins.create(i, 250, 'coins');
            i = i+1000;
            
        }
        coins.create(i, 150, 'coins');
        coins.create(i+50, 200, 'coins');
        coins.create(i, 250, 'coins');
    }
    


    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '18px', fill: '#000' }).setScrollFactor(0);




    //  Collide the player and the coins with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, coinPlatforms);

    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoins function
    this.physics.add.overlap(player, coins, collectCoins, null, this);


    this.add.image(3000,600, 'ground');
    this.add.image(3000,550, 'ground');
    this.add.image(3000,500, 'ground');
    this.add.image(3000,450, 'ground');

    //Camera
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.followOffset.set(-300, 0);
}

function update() 
{
    /*if (cursors.left.isDown)
    {
        player.setVelocityX(-900);

        player.anims.play('walk', true);
        player.flipX = true;
    }
    else */if (cursors.right.isDown)
    {
        player.setVelocityX(500);

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

function collectCoins (player, coins)
{
    coins.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
}