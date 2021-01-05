import 'phaser';

export default class BlackHole extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, spriteKey) {
    super(scene, 400, 400, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }
}
