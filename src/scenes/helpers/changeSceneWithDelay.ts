export default function(
  currentScene: Phaser.Scene,
  nextScene: string,
  delay: number = 500,
  data: object = {}
) {
  currentScene.time.addEvent({
    delay: delay,
    callback: () => {
      currentScene.scene.stop();
      currentScene.scene.start(nextScene, data);
    },
    callbackScope: this
  });
}
