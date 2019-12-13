import GameScene from '../GameScene';
import changeScene from './changeScene';

export default function(scene: GameScene) {
  return function(event: Phaser.Physics.Matter.Events.CollisionActiveEvent) {
    const left = scene.player.collection.sensors.left;
    const right = scene.player.collection.sensors.right;
    const bottom = scene.player.collection.sensors.bottom;

    for (let i = 0; i < event.pairs.length; i++) {
      const bodyA = event.pairs[i].bodyA;
      const bodyB = event.pairs[i].bodyB;

      if (bodyA.parent.label === 'dangerousTile') {
        scene.player.destroyCompoundBody();
        return;
      }

      if (bodyA.parent.label === 'exitTile' && bodyB.label === 'player') {
        scene.cameras.main.zoomTo(2);
        changeScene(scene, 'GameScene', 1000);
      }

      if (bodyA === bottom || bodyB === bottom) {
        // Standing on any surface counts (e.g. jumping off of a non-static crate).
        scene.player.collection.numTouching.bottom += 1;
      } else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic)) {
        // Only static objects count since we don't want to be blocked by an object that we
        // can push around.
        scene.player.collection.numTouching.left += 1;
      } else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic)) {
        scene.player.collection.numTouching.right += 1;
      }
    }
  };
}
