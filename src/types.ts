import Mixer from './api/Mixer';
import Interactive from './api/Interactive';

export interface PhaserGame extends Phaser.Game {
  mixer: Mixer;
  interactive: Interactive;
}

type KeysDirection = 'left' | 'right' | 'bottom';

export interface IGameConfig {
  isInteractive: boolean;
}

export interface IPlayer {
  matterSprite: Phaser.Physics.Matter.Sprite | null;
  body: any;
  blocked: Record<KeysDirection, boolean>;
  numTouching: Record<KeysDirection, number>;
  sensors: Record<KeysDirection, any>; // TODO
  time: {
    leftDown: number;
    rightDown: number;
  };
  lastJumpedAt: number;
  speed: {
    run: number;
    jump: number;
  };
}
