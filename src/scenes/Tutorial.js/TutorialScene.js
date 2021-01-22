import 'phaser';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.currentZone = 0;
    this.timeRemaining = 30;
    this.blackHoleCollision = false;
  }

  preload() {
    this.load.image('blackHole', 'assets/sprites/blackHole.png');
    this.load.image('star', 'assets/sprites/star.png');
    this.load.spritesheet('spaceship', 'assets/spriteSheets/spaceship2.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('gravityZone', 'assets/sprites/gravityZone.png');
    this.load.image('nebula', 'assets/sprites/Nebula.png');
  }

  createPlayerAndControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceship = new Spaceship(this, 100, 100, 'spaceship')
      .setCircle(32)
      .setScale(2);
  }

  //sprites
  createBlackHole() {
    this.blackHole = new BlackHole(this, 'blackHole')
      .setScale(1.5)
      .setCircle(16, 16, 16);
  }

  createObjectGroups() {
    this.gravityZoneGroup = this.physics.add.group({
      classType: GravityZone,
    });
    this.starGroup = this.physics.add.group({ classType: Star });
    this.nutronGroup = this.physics.add.group({ classType: Star });
    this.nebulaGroup = this.physics.add.group({ classType: Nebula });
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
    nebula.setVisible(false);
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
        .setCircle(20, 12, 12)
    );
  }

  createNutronStar(x, y, color, scale = 0.5) {
    this.nutronGroup.add(
      new Star(this, x, y, 'star', scale)
        .setTint(color)
        .setScale(scale)
        .setCircle(20, 12, 12)
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

  createGavityZone(scale = 1, name) {
    this.gravityZoneGroup.add(
      new GravityZone(this, 'gravityZone').setScale(scale).setCircle(100)
    );
  }

  createAnims() {
    this.anims.create({
      key: 'stop',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'turnRight',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 6,
        end: 7,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: 'turnLeft',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 9,
        end: 10,
      }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: 'boost',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 13,
        end: 17,
      }),
      frameRate: 14,
      repeat: 0,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 0,
        end: 0,
      }),
      frameRate: 14,
    });
  }
}
