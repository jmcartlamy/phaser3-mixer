import balls from '../assets/sprites/balls.png';
import map from '../assets/tilemaps/tileset-collision-shapes.json';
import tileMaps from '../assets/tilemaps/kenny_platformer_64x64.png';

import Controls from '../objects/Controls';
import TileMap from '../objects/TileMap';

import addBalls from '../helpers/addBalls';
import handleBallsCollision from '../helpers/handleBallsCollision';

export default class GameScene extends Phaser.Scene {
  private controls: Phaser.Cameras.Controls.FixedKeyControl;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  public preload() {
    this.load.spritesheet('balls', balls, { frameWidth: 17, frameHeight: 17 });
    // @ts-ignore
    this.load.tilemapTiledJSON('map', map);
    this.load.image('tileMaps', tileMaps);
  }

  public create() {
    // Create map following json loaded
    new TileMap(this, 'map');

    // Drop matter balls on pointer down.
    this.input.on('pointerdown', addBalls(this), this);

    // Loop over all the collision pairs that start colliding
    // on each step of the Matter engine.
    this.matter.world.on('collisionstart', handleBallsCollision(this), this);

    // Create cursor keys for camera
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Controls({
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
    });
  }

  public update(time: number, delta: number) {
    this.controls.update(delta);
  }
}
