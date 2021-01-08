import 'phaser';

export default class Star extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, scale) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.fuelStore = 10 * scale;
  }
}
