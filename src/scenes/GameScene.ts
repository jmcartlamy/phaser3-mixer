import sky from '../assets/sky.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  public preload() {
    this.load.image('sky', sky);
  }

  public create() {
    this.add
      .image(0, 0, 'sky')
      .setOrigin(0, 0)
      .setScrollFactor(0);
  }

  public update() {}
}
