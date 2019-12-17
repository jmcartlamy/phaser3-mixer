import interactive from '../api/interactive';
import mixer from '../api/mixer';
import { GameScenes } from '../constants';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: GameScenes.Load
    });
  }

  public preload() {
    this.add.text(10, 10, 'Connexion...', { font: '16px Courier', fill: '#00ff00' });

    // Get token from current mixer instance
    const token = mixer.getCurrentToken();
    // Create an interactive game session (mixplay) and start next scene
    interactive.setup(token, this);
  }
}
