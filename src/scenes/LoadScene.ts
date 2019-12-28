import Interactive from '../api/Interactive';
import { GameScenes } from '../constants';
import { PhaserGame } from '../types';

export default class LoadScene extends Phaser.Scene {
  public game: PhaserGame;

  constructor() {
    super({
      key: GameScenes.Load
    });
  }

  public async preload() {
    this.add.text(10, 10, 'Connexion...', { font: '16px Courier', fill: '#00ff00' });

    // Get token from current mixer instance
    const token = await this.game.mixer.getToken();

    if (token) {
      // Create an interactive game session (mixplay) and start next scene
      this.game.interactive = new Interactive();
      this.game.interactive.setup(token, this);
    } else {
      this.scene.start(GameScenes.Menu);
    }
  }
}
