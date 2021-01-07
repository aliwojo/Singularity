import 'phaser';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';
import Nebula from '../entity/Nebula';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.currentZone = 0;
    this.timeRemaining = 30;
  }

  preload() {
    this.load.image('blackHole', 'assets/sprites/blackHole.png');
    this.load.image('star', 'assets/sprites/star.png');
    this.load.spritesheet('spaceship', 'assets/spriteSheets/spaceship.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('gravityZone', 'assets/sprites/gravityZone.png');
    this.load.image('nebula', 'assets/sprites/Nebula.png');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    //sprites
    this.blackHole = new BlackHole(this, 'blackHole')
      .setScale(1.5)
      .setCircle(32);

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

    this.nebulaGroup = this.physics.add.group({ classType: Nebula });
    this.createNebula(200, 200);
    this.createNebula(200, 400);

    this.spaceship = new Spaceship(this, 100, 100, 'spaceship').setCircle(32);

    //timed events
    this.timer = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: function () {
        this.timeRemaining -= 1 / (2 * this.currentZone);
        this.spaceship.fuelLevel -= this.currentZone / 2;
      },
      callbackScope: this,
    });

    //animations and tweens
    this.createAnims();

    this.tweens.add({
      targets: [
        this.blackHole,
        ...this.starGroup.getChildren(),
        ...this.gravityZoneGroup.getChildren(),
      ],
      duration: 1000000,
      ease: 'Power2',
      angle: 360,
      repeat: -1,
    });

    //colliders
    this.physics.add.overlap(
      this.spaceship,
      this.starGroup,
      this.collectFuel,
      null,
      this
    );

    this.physics.add.overlap(
      this.spaceship,
      this.nebulaGroup,
      this.collectResources,
      null,
      this
    );

    //text
    this.timerDisplay = this.add
      .text(50, 20, `Time remaining: ${this.timer}`)
      .setColor('#69ff33');

    this.fuelLevelDisplay = this.add
      .text(50, 40, `Fuel Level: ${this.spaceship.fuelLevel}%`)
      .setColor('#69ff33');

    this.availableResources = this.nebulaGroup
      .getChildren()
      .map((nebula) => nebula.resources)
      .reduce((sum, num) => sum + num);

    this.availableResourcesDisplay = this.add.text(
      575,
      20,
      `Available Resources: ${this.availableResources}`
    );

    this.resourcesCollectedDisplay = this.add.text(
      575,
      40,
      `Resources Collected: ${this.spaceship.resourcesCollected}`
    );

    this.endgameText = this.add
      .text(400, 400, '', { fontSize: '100px' })
      .setOrigin(0.5);
  }

  collectFuel(spaceship, star) {
    const fuel = star.fuelStore;
    spaceship.refuel(fuel);
    star.fuelStore = 0;
  }

  collectResources(spaceship, nebula) {
    const resources = nebula.resources;
    spaceship.updateResources(resources);
    nebula.depleteResources();
  }

  setCurrentZone() {
    const distanceFromBH = Math.round(
      Phaser.Math.Distance.Between(
        this.spaceship.x,
        this.spaceship.y,
        this.blackHole.x,
        this.blackHole.y
      )
    );
    this.currentZone =
      distanceFromBH < 75
        ? 5
        : distanceFromBH < 150
        ? 4
        : distanceFromBH < 225
        ? 3
        : distanceFromBH < 300
        ? 2
        : 1;
  }

  createStar(x, y, color, scale = 1) {
    this.starGroup.add(
      new Star(this, x, y, 'star', scale)
        .setTint(color)
        .setScale(scale)
        .setCircle(32)
    );
  }

  createNebula(x, y, color, scale = 1) {
    this.nebulaGroup.add(
      new Nebula(this, x, y, 'nebula', scale)
        .setTint(color)
        .setScale(scale)
        .setCircle(32)
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

  update(time, delta) {
    this.setCurrentZone();
    this.spaceship.update(this.cursors, this.currentZone, time);
    this.updateText();

    if (this.spaceship.fuelLevel < 0 || this.timeRemaining < 0) {
      this.physics.pause();
      this.tweens.pauseAll();
      this.anims.pauseAll();
      this.timer.paused = true;
      this.endgameText.setText('GAME OVER');
    }

    if (this.spaceship.resourcesCollected === this.availableResources) {
      this.physics.pause();
      this.tweens.pauseAll();
      this.anims.pauseAll();
      this.timer.paused = true;
      this.endgameText.setText('YOU WIN!');
    }
  }

  updateText() {
    this.timerDisplay.setText(
      `Time remaining: ${Math.round(this.timeRemaining)}`
    );
    if (this.timeRemaining < 10) this.timerDisplay.setColor('#fa1013');
    this.fuelLevelDisplay.setText(
      `Fuel Level: ${Math.round(this.spaceship.fuelLevel)}%`
    );
    if (this.spaceship.fuelLevel < 10)
      this.fuelLevelDisplay.setColor('#fa1013');

    this.resourcesCollectedDisplay.setText(
      `Resources Collected: ${this.spaceship.resourcesCollected}`
    );
  }
}
