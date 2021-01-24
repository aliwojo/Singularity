import 'phaser';
import controlsStore from '../redux/controlsStore';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';
import Nebula from '../entity/Nebula';

export { BlackHole, GravityZone, Spaceship, Star, Nebula };

export default class BaseScene extends Phaser.Scene {
  constructor(name) {
    super(name);
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

  createPlayerAndControls(scale = 1) {
    this.controls = controlsStore.getState();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.up = this.input.keyboard.addKey(this.controls.up);
    this.cursors.down = this.input.keyboard.addKey(this.controls.down);
    this.cursors.right = this.input.keyboard.addKey(this.controls.right);
    this.cursors.left = this.input.keyboard.addKey(this.controls.left);
    this.cursors.enter = this.input.keyboard.addKey(this.cursors.enter);
    this.cursors.space = this.input.keyboard.addKey(this.cursors.space);
    this.cursors.shift = this.input.keyboard.addKey(this.cursors.shift);
    this.spaceship = new Spaceship(this, 100, 100, 'spaceship')
      .setCircle(32)
      .setScale(scale);
  }

  //sprites
  createBlackHole(scale = 1) {
    this.blackHole = new BlackHole(this, 'blackHole')
      .setScale(scale)
      .setCircle(16, 16, 16);
  }

  createObjectGroups() {
    this.gravityZoneGroup = this.physics.add.group({
      classType: GravityZone,
    });
    this.starGroup = this.physics.add.group({ classType: Star });
    this.neutronGroup = this.physics.add.group({ classType: Star });
    this.nebulaGroup = this.physics.add.group({ classType: Nebula });
  }

  createColliders(starFunc, nebulaFunc, neutronFunc, bHFunc) {
    this.physics.add.overlap(
      this.spaceship,
      this.starGroup,
      starFunc,
      null,
      this
    );

    this.physics.add.overlap(
      this.spaceship,
      this.nebulaGroup,
      nebulaFunc,
      null,
      this
    );

    this.physics.add.overlap(
      this.spaceship,
      this.blackHole,
      bHFunc,
      null,
      this
    );

    this.physics.add.overlap(
      this.spaceship,
      this.neutronGroup,
      neutronFunc,
      null,
      this
    );
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

  createNeutronStar(x, y, color, scale = 0.5) {
    this.neutronGroup.add(
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

  createGavityZones() {
    for (let i = 5; i > 0; i--) {
      this.gravityZoneGroup.add(
        new GravityZone(this, 'gravityZone').setScale(i * 0.75).setCircle(100)
      );
    }
  }

  createStatusDisplay() {
    this.timerDisplay = this.add.text(50, 25, `Time remaining: ${this.timer}`, {
      color: '#69ff33',
      fontSize: '20px',
    });
    this.fuelLevelDisplay = this.add.text(
      50,
      50,
      `Fuel Level: ${this.spaceship.fuelLevel}%`,
      {
        color: '#69ff33',
        fontSize: '20px',
      }
    );
    this.resourcesDisplay = this.add.text(640, 25, 'RESOURCES', {
      color: '#69ff33',
      fontSize: 20,
    });
    this.availableResources = this.nebulaGroup
      .getChildren()
      .map((nebula) => nebula.resources)
      .reduce((sum, num) => sum + num);
    this.availableResourcesDisplay = this.add.text(
      640,
      50,
      `Available: ${this.availableResources}`,
      {
        color: '#69ff33',
      }
    );
    this.resourcesCollectedDisplay = this.add.text(
      640,
      70,
      `COLLECTED: ${this.spaceship.resourcesCollected}`,
      {
        color: '#69ff33',
        fontSize: 20,
      }
    );
  }

  createContolsDisplay() {
    this.controlsDisplayLeft = this.add.text(
      550,
      750,
      `${this.controls.up} : boost forward\n${this.controls.down} : stop`,
      {
        color: '#69ff33',
        fontSize: '20px',
      }
    );
    this.controlsDisplayRight = this.add.text(
      20,
      750,
      `${this.controls.left} : rotate left\n${this.controls.right} : rotate right`,
      { color: '#69ff33', fontSize: '20px' }
    );
  }

  createAnims() {
    this.anims.create({
      key: 'stop',
      frames: this.anims.generateFrameNumbers('spaceship', {
        start: 1,
        end: 5,
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

  updateText() {
    this.timerDisplay.setText(`Time: ${Math.round(this.timeRemaining)}`);
    if (this.timeRemaining < 10) this.timerDisplay.setColor('#fa1013');
    this.fuelLevelDisplay.setText(
      `Fuel: ${Math.round(this.spaceship.fuelLevel)}%`
    );
    if (this.spaceship.fuelLevel < 10)
      this.fuelLevelDisplay.setColor('#fa1013');

    this.resourcesCollectedDisplay.setText(
      `COLLECTED: ${this.spaceship.resourcesCollected}`
    );
  }

  updateRotations(objects) {
    objects.forEach((obj) => {
      const distance = Phaser.Math.Distance.Between(400, 400, obj.x, obj.y);
      Phaser.Actions.RotateAround([obj], { x: 400, y: 400 }, 0.3 / distance);
      obj.setAngularVelocity(10);
    });
  }
  gameOver() {
    this.scene.start('GameOverScene');
  }
  statusEndGame() {
    if (this.spaceship.fuelLevel === 0 || this.timeRemaining <= 0) {
      this.scene.start('GameOverScene');
      //this.endGame('GAME OVER');
    }

    if (this.spaceship.resourcesCollected === this.availableResources) {
      this.scene.start('WinScene');
      //this.endGame('YOU WIN!');
    }
  }
}
