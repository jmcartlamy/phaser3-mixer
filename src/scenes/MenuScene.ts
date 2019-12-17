import fullscreen from '../assets/sprites/fullscreen.png';

import toggleFullscreen from './helpers/toggleFullscreen';
import { GAME_SCREEN_WIDTH, GameScenes } from '../constants';
import interactive from '../api/interactive';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: GameScenes.Menu
    });
  }

  public preload() {
    this.add.text(10, 10, 'Press 1 to launch', { font: '16px Courier', fill: '#00ff00' });

    this.load.spritesheet('fullscreen', fullscreen, {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  public create() {
    // Update interactive scene (mixplay)
    interactive.onMenu();

    // Create full screen button
    // TODO move to settings & FIXME passing data like isFullScreen
    const button = this.add
      .image(GAME_SCREEN_WIDTH - 16, 16, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setInteractive();

    button.on('pointerup', toggleFullscreen(this, button), this);

    // On press to key '1', we start the next scene
    this.input.keyboard.once('keyup_ONE', () => {
      this.scene.start(GameScenes.Game);
    });
  }
}
