import 'phaser';

export default class Spaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
  }
  update(cursors) {
    if (cursors.right.isDown) {
      this.setAngularVelocity(100);
    } else if (cursors.left.isDown) {
      this.setAngularVelocity(-100);
    } else {
      this.setAngularVelocity(0);
    }
  }
}
