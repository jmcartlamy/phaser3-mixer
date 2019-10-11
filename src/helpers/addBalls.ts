export default function(scene: Phaser.Scene) {
  return function() {
    // @ts-ignore
    const worldPoint: Phaser.Math.Vector2 = scene.input.activePointer.positionToCamera(
      scene.cameras.main
    );
    for (let i = 0; i < 5; i++) {
      const x = worldPoint.x + Phaser.Math.RND.integerInRange(-5, 5);
      const y = worldPoint.y + Phaser.Math.RND.integerInRange(-5, 5);
      const frame = Phaser.Math.RND.integerInRange(0, 5);
      scene.matter.add.image(x, y, 'balls', frame, {
        restitution: 1,
        label: 'ball'
      });
    }
  };
}
