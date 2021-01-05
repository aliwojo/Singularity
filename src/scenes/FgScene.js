import 'phaser';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
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
    this.blackHole = new BlackHole(this, 'blackHole').setScale(1.5);
    this.blackHole.body.setCircle(32);
    this.spaceship = new Spaceship(this, 100, 100, 'spaceship');
    this.starGroup = this.physics.add.group({ classType: Star });
    this.gravityZoneGroup = this.physics.add.group({
      classType: GravityZone,
    });
    this.createStar(200, 200);
    this.createGavityZone(1);
    this.createGavityZone(2);
    this.createGavityZone(3);
    this.createGavityZone(4);
    this.createAnims();
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
  }

  update() {
    this.spaceship.play('highPower', true);
  }
}
