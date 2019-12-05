import 'phaser';

import GameScene from './scenes/GameScene';
import mixer from './api/mixer';

import { GAME_SCREEN_HEIGHT, GAME_SCREEN_WIDTH } from './constants';

const config = {
  type: Phaser.AUTO,
  width: GAME_SCREEN_WIDTH,
  height: GAME_SCREEN_HEIGHT,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    width: GAME_SCREEN_WIDTH,
    height: GAME_SCREEN_HEIGHT
  },
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
  // Create an instance of `Mixer` and use Oauth2 Code Authorization
  // to create a new mixer token or to retrieve an existing valid mixer token
  await mixer.getToken();

  // Launch the game
  let game = new Game(config);
});
