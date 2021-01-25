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
    this.isBoosted = false;
    this.isStopped = false;
    this.boosts = 0;
  }

  update(cursors, currentZone, sound) {
    this.updateMovement(cursors, currentZone, sound);
  }

  updateMovement(cursors, currentZone, sound) {
    if (cursors.up.isDown) {
      if (!this.isBoosted) {
        this.boosts += 1;
        this.scene.physics.velocityFromAngle(
          this.angle,
          this.boosts * 100,
          this.body.velocity
        );
        sound.play();
        this.anims.play('boost');
        this.fuelLevel -= 3 * currentZone;
        if (this.fuelLevel < 0) this.fuelLevel = 0;
        this.isBoosted = true;
      }
    } else if (cursors.down.isDown) {
      if (!this.isStopped) {
        this.setVelocity(0);
        this.setAngularVelocity(0);
        this.boosts = 0;
        this.anims.play('stop', true);
        this.fuelLevel -= 1 * currentZone;
        if (this.fuelLevel < 0) this.fuelLevel = 0;
        this.isStopped = true;
      }
    } else {
      this.isStopped = false;
      this.isBoosted = false;
      if (cursors.right.isDown) {
        this.setAngularVelocity(200);
        this.boosts = 0;
        if (!this.anims.isPlaying) this.anims.play('turnRight', true);
      } else if (cursors.left.isDown) {
        this.boosts = 0;
        this.setAngularVelocity(-200);
        if (!this.anims.isPlaying) this.anims.play('turnLeft', true);
      } else {
        this.setAngularVelocity(0);
        if (!this.anims.isPlaying) this.anims.play('idle', true);
      }
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
