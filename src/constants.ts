import { IPlayer } from './types';

export const GAME_SCREEN_WIDTH = 1280;
export const GAME_SCREEN_HEIGHT = 720;

export const PLAYER_COLLECTION: IPlayer = {
  matterSprite: null,
  body: null,
  blocked: {
    left: false,
    right: false,
    bottom: false
  },
  numTouching: {
    left: 0,
    right: 0,
    bottom: 0
  },
  sensors: {
    bottom: null,
    left: null,
    right: null
  },
  time: {
    leftDown: 0,
    rightDown: 0
  },
  lastJumpedAt: 0,
  speed: {
    run: 5,
    jump: 14
  }
};
