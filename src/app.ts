import 'phaser';
import { JSO } from 'jso';

import GameScene from './scenes/GameScene';
import mixer from './api/mixer';

import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from './constants';

const config = {
  type: Phaser.AUTO,
  width: GAME_SCREEN_WIDTH,
  height: GAME_SCREEN_HEIGHT,
  backgroundColor: '#000000',
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
      enableSleep: true
    }
  },
  scene: [GameScene]
};

class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', async () => {
  await mixer.getToken();

  let game = new Game(config);
});
