import settings from '../assets/sprites/settings.png';

import toggleFullscreen from './helpers/toggleFullscreen';
import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH, GameScenes } from '../constants';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({
      key: GameScenes.Pause
    });
  }

  public preload() {
    this.load.spritesheet('settings', settings, {
      frameWidth: 48,
      frameHeight: 48
    });
  }

  public create() {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.70)');

    const resumeButton = this.add
      .text(GAME_SCREEN_WIDTH / 2, GAME_SCREEN_HEIGHT / 2 - 88, 'Resume', {
        font: '16px Courier',
        fill: '#ffffff',
        backgroundColor: '#2980b9'
      })
      .setPadding(48, 16, 48, 16)
      .setOrigin(0.5)
      .setInteractive();

    const fullScreenButton = this.add
      .text(GAME_SCREEN_WIDTH / 2, GAME_SCREEN_HEIGHT / 2, 'Full Screen ?', {
        font: '16px Courier',
        fill: '#ffffff',
        backgroundColor: '#2980b9'
      })
      .setPadding(48, 16, 48, 16)
      .setOrigin(0.5)
      .setInteractive();

    const exitButton = this.add
      .text(GAME_SCREEN_WIDTH / 2, GAME_SCREEN_HEIGHT / 2 + 88, 'Exit', {
        font: '16px Courier',
        fill: '#ffffff',
        backgroundColor: '#2980b9'
      })
      .setPadding(48, 16, 48, 16)
      .setOrigin(0.5)
      .setInteractive();

    resumeButton.on(
      'pointerup',
      function() {
        this.scene.stop(GameScenes.Pause);
        this.scene.resume(GameScenes.Game);
        this.game.interactive?.resume();
      },
      this
    );

    fullScreenButton.on('pointerup', toggleFullscreen(this), this);

    exitButton.on(
      'pointerup',
      function() {
        this.scene.stop(GameScenes.Pause);
        this.scene.stop(GameScenes.Game);
        this.scene.start(GameScenes.Menu);
      },
      this
    );
  }
}
