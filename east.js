
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.tilemap('map', 'assets/tilemaps/maps/east.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/pkmn.png', 32, 32);
    game.load.spritesheet('player', 'assets/sprites/gold.png', 16, 16);

}

var map;
var layer;
var cursors;
var player;

function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
    map = game.add.tilemap('map');

    //  Now add in the tileset
    map.addTilesetImage('pkmn.png', 'tiles');
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    map.setCollisionByExclusion([22, 42, 192, 200]);

    //  Un-comment this on to see the collision tiles
    //layer.debug = true;

    //  Player Sprite &Animation
    player = game.add.sprite(815, 910, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    //player.body.setSize(10, 14, 2, 1);
    //padding to prevent half stepping through walls
    
    game.camera.follow(player);

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();

    var mapname = game.add.text(16, 16, 'East Campus', { font: '14px Arial', fill: '#000000' });
    mapname.fixedToCamera = true;

}

function update() {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -175;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 175;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -175;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 175;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

}

function render() {

     //game.debug.body(player);

}