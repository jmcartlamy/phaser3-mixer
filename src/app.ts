import 'phaser';

import GameScene from './scenes/GameScene';
import mixer from './api/mixer';
import interactive from './api/interactive';

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
  // Use Oauth2 Code Authorization to get a mixer token
  const token = await mixer.getToken();

  // Create an interactive game session (mixplay)
  interactive.setup(token);

  // Launch the game
  let game = new Game(config);
});
