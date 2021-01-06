import 'phaser';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.timeMultiplier = 1;
  }

  preload() {
    this.load.image('blackHole', 'assets/sprites/blackHole.png');
    this.load.image('star', 'assets/sprites/star.png');
    this.load.spritesheet('spaceship', 'assets/spriteSheets/spaceship.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('gravityZone', 'assets/sprites/gravityZone.png');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.blackHole = new BlackHole(this, 'blackHole').setScale(1.5);
    this.blackHole.body.setCircle(32);
    this.gravityZoneGroup = this.physics.add.group({
      classType: GravityZone,
    });
    for (let i = 5; i > 0; i--) {
      this.createGavityZone(i * 0.75);
    }
    this.starGroup = this.physics.add.group({ classType: Star });
    this.createStar(400, 300);
    this.createStar(600, 500);
    this.createStar(700, 700);
    this.createStar(500, 600);
    this.spaceship = new Spaceship(this, 100, 100, 'spaceship').setCircle(32);
    this.createAnims();
    this.time = this.add.text(700, 100, `${this.timeMultiplier}`);

    this.tweens.add({
      targets: [
        this.blackHole,
        ...this.starGroup.getChildren(),
        ...this.gravityZoneGroup.getChildren(),
      ],
      duration: 200000,
      ease: 'Power2',
      angle: 360,
    });

    this.physics.add.overlap(this.spaceship, this.gravityZoneGroup);
  }

  changeTime() {
    this.timeMultiplier = Phaser.Math.Distance.Between(
      this.spaceship.x,
      this.spaceship.y,
      this.blackHole.x,
      this.blackHole.y
    );
  }

  createStar(x, y, color, scale = 1) {
    this.starGroup.add(
      new Star(this, x, y, 'star').setTint(color).setScale(scale).setCircle(32)
    );
  }

  createGavityZone(scale = 1) {
    this.gravityZoneGroup.add(
      new GravityZone(this, 'gravityZone').setScale(scale).setCircle(100)
    );
  }

  createAnims() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'lowPower',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 1,
        end: 2,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'midPower',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 3,
        end: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'highPower',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 5,
        end: 6,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'accelerate',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 0,
        end: 6,
      }),
      frameRate: 8,
      repeat: 1,
    });
  }

  update() {
    this.changeTime();
    this.time.text = `${this.timeMultiplier}`;
    if (this.timeMultiplier < 150) {
      this.spaceship.play('highPower');
    } else if (this.timeMultiplier < 250) {
      this.spaceship.play('midPower');
    } else if (this.timeMultiplier < 350) {
      this.spaceship.play('lowPower');
    } else {
      this.spaceship.play('idle');
    }
    this.physics.velocityFromAngle(
      this.spaceship.angle,
      100,
      this.spaceship.body.velocity
    );
    this.spaceship.update(this.cursors);
  }
}
