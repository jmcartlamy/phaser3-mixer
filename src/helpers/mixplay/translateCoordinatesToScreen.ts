import { GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT } from '../../constants';

export default function(x: number, y: number) {
  return {
    x: GAME_SCREEN_WIDTH * x,
    y: GAME_SCREEN_HEIGHT - GAME_SCREEN_HEIGHT * y
  };
}
