import balls from '../assets/sprites/balls.png';
import fullscreen from '../assets/sprites/fullscreen.png';
import player from '../assets/sprites/player.png';
import map from '../assets/tilemaps/tileset-collision-shapes.json';
import tileMaps from '../assets/tilemaps/kenny_platformer_64x64.png';

import TileMap from '../objects/TileMap';
import Player from '../objects/Player';

import mixer from '../api/mixer';
import interactive from '../api/interactive';

import addBallsToActivePointer from './helpers/addBallsToActivePointer';
import handleBallsCollision from './helpers/handleBallsCollision';
import toggleFullscreen from './helpers/toggleFullscreen';
import { GAME_SCREEN_WIDTH } from '../constants';
import handlePlayerCollision from './helpers/handlePlayerCollision';

export default class GameScene extends Phaser.Scene {
  public player: Player;

  constructor() {
    super({
      key: 'GameScene'
    });

    // Get token from current mixer instance
    const token = mixer.getCurrentToken();
    // Create an interactive game session (mixplay)
    interactive.setup(this, token);
  }

  public preload() {
    this.load.spritesheet('balls', balls, { frameWidth: 17, frameHeight: 17 });
    this.load.spritesheet('player', player, {
      frameWidth: 32,
      frameHeight: 42
    });
    this.load.spritesheet('fullscreen', fullscreen, {
      frameWidth: 64,
      frameHeight: 64
    });
    // @ts-ignore
    this.load.tilemapTiledJSON('map', map);
    this.load.image('tileMaps', tileMaps);
  }

  public create() {
    // Create map following json loaded
    const tilemap = new TileMap(this, 'map');

    // Create player and init his position
    this.player = new Player(this, tilemap.map);

    // Drop matter balls on pointer down.
    this.input.on('pointerdown', addBallsToActivePointer(this), this);

    // Loop over all the collision pairs that start colliding
    // on each step of the Matter engine.
    this.matter.world.on('collisionstart', handleBallsCollision(this), this);

    // Before matter's update, reset the player's count of what surfaces it is touching.
    this.matter.world.on('beforeupdate', () => {
      this.player.collection.numTouching.left = 0;
      this.player.collection.numTouching.right = 0;
      this.player.collection.numTouching.bottom = 0;
    });

    // Loop over the active colliding pairs and count the surfaces the player is touching.
    this.matter.world.on('collisionactive', handlePlayerCollision(this));

    // Update over, so now we can determine if any direction is blocked
    this.matter.world.on('afterupdate', () => {
      this.player.collection.blocked.right = this.player.collection.numTouching.right > 0;
      this.player.collection.blocked.left = this.player.collection.numTouching.left > 0;
      this.player.collection.blocked.bottom = this.player.collection.numTouching.bottom > 0;
    });

    // Create full screen button
    // TODO move to settings
    const button = this.add
      .image(GAME_SCREEN_WIDTH - 16, 16, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setInteractive();
    button.on('pointerup', toggleFullscreen(this, button), this);
  }

  public update(time: number, delta: number) {
    this.player.update(time, delta);
  }
}
