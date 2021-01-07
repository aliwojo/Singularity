import 'phaser';

export default class Spaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.fuelLevel = 100;
    this.resourcesCollected = 0;
  }

  update(cursors, currentZone) {
    this.updateMovement(cursors);

    this.updateAnimation(currentZone);

    this.scene.physics.velocityFromAngle(this.angle, 100, this.body.velocity);
  }

  updateMovement(cursors) {
    if (cursors.right.isDown) {
      this.setAngularVelocity(100);
    } else if (cursors.left.isDown) {
      this.setAngularVelocity(-100);
    } else {
      this.setAngularVelocity(0);
    }
  }

  updateAnimation(currentZone) {
    if (currentZone < 2) {
      this.play('idle', true);
    } else if (currentZone === 2) {
      this.play('lowPower', true);
    } else if (currentZone === 3) {
      this.play('midPower', true);
    } else {
      this.play('highPower', true);
    }
  }

  refuel(amount) {
    if (this.fuelLevel + amount > 100) {
      this.fuelLevel = 100;
    } else {
      this.fuelLevel += amount;
    }
  }

  updateResources(amount) {
    this.resourcesCollected += amount;
  }
}
