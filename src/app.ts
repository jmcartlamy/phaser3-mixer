import 'phaser';
import Mixer from './api/Mixer';

import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';
import PauseScene from './scenes/PauseScene';
import GameScene from './scenes/GameScene';

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
  scene: [LoadScene, MenuScene, GameScene, PauseScene]
};

class Game extends Phaser.Game {
  protected mixer: any;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    /**
     * Create an instance of `Mixer` and use Oauth2 Code Authorization
     * to create a new mixer token or to retrieve an existing valid mixer token
     */
    this.mixer = new Mixer();
  }
}

window.addEventListener('load', async () => {
  /* Launch the Phaser.Game instance */
  new Game(config);
});
