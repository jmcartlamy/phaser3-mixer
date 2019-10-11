export default class TileMap {
  constructor(scene: Phaser.Scene, key: string) {
    const map = scene.make.tilemap({ key });
    const tileset = map.addTilesetImage('tileMaps');

    const layer = map.createDynamicLayer(0, tileset, 0, 0);

    // Set colliding tiles before converting the layer to Matter bodies!
    layer.setCollisionByProperty({ collides: true });

    // Convert the layer. Any colliding tiles will be given a Matter body. If a tile has collision
    // shapes from Tiled, these will be loaded. If not, a default rectangle body will be used. The
    // body will be accessible via tile.physics.matterBody.
    scene.matter.world.convertTilemapLayer(layer);

    scene.matter.world.setBounds(map.widthInPixels, map.heightInPixels);
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    scene.cameras.main.setScroll(95, 100);

    // Change label makes easier to check Matter collisions.
    layer.forEachTile(function(tile) {
      if (tile.properties.type === 'lava' || tile.properties.type === 'spike') {
        // @ts-ignore
        tile.physics.matterBody.body.label = 'dangerousTile';
      }
    });
  }
}
