import 'phaser';
import controlsStore from '../redux/controlsStore';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';
import Nebula from '../entity/Nebula';
import coordinates from '../entity/coordinates';

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
    this.load.image('nebula1', 'assets/sprites/Nebula.png');
    this.load.image('nebula2', 'assets/sprites/Nebula2.png');
    this.load.image('nebula3', 'assets/sprites/Nebula3.png');
    this.load.image('nebula4', 'assets/sprites/Nebula4.png');
    this.load.image('neutronStar', 'assets/sprites/NeutronStar.png');
  }

  randomGenObjects() {
    const shuffledCoords = Phaser.Math.RND.shuffle(coordinates);
    for (let i = 0; i < 40; i++) {
      if (i < 5) {
        this.createStar(...shuffledCoords[i]);
      } else if (i < 15) {
        this.createNeutronStar(...shuffledCoords[i]);
      } else if (i < 40) {
        this.createNebula(...shuffledCoords[i]);
      }
    }
  }

  createControls() {
    this.controls = controlsStore.getState();
    this.cursors = {};
    this.cursors.up = this.input.keyboard.addKey(this.controls.up);
    this.cursors.down = this.input.keyboard.addKey(this.controls.down);
    this.cursors.right = this.input.keyboard.addKey(this.controls.right);
    this.cursors.left = this.input.keyboard.addKey(this.controls.left);
    this.cursors.enter = this.input.keyboard.addKey(this.controls.enter);
    this.cursors.space = this.input.keyboard.addKey(this.controls.space);
    this.cursors.shift = this.input.keyboard.addKey(this.controls.shift);
  }

  createPlayer(scale = 1) {
    this.spaceship = new Spaceship(this, 50, 100, 'spaceship')
      .setCircle(20, 12, 12)
      .setScale(scale);
  }

  //sprites
  createBlackHole(scale = 1.5) {
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

  createStar(x, y, scale = 1) {
    this.starGroup.add(
      new Star(this, x, y, 'star', scale).setScale(scale).setCircle(20, 12, 12)
    );
  }

  createNeutronStar(x, y, scale = 0.5) {
    this.neutronGroup.add(
      new Star(this, x, y, 'neutronStar', scale)
        .setScale(scale)
        .setCircle(20, 12, 12)
    );
  }

  createNebula(x, y, scale = 1) {
    const num = Math.ceil(Math.random() * 4);
    this.nebulaGroup.add(
      new Nebula(this, x, y, `nebula${num}`, scale)
        .setCircle(32)
        .setScale(scale)
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
    this.timerDisplay = this.add.text(20, 15, `TIME: ${this.timer}`, {
      color: '#69ff33',
      fontSize: '20px',
    });
    this.add.text(20, 35, 'FUEL:', { color: '#69ff33', fontSize: '20px' });
    this.add.rectangle(20, 60, 100, 10, 0xffffff).setOrigin(0);
    this.fuelLevelDisplay = this.add
      .rectangle(20, 60, this.spaceship.fuelLevel, 10, 0x69ff33)
      .setOrigin(0);

    this.resourcesDisplay = this.add.text(650, 15, 'RESOURCES:', {
      color: '#69ff33',
      fontSize: 20,
    });
    this.availableResources = this.nebulaGroup
      .getChildren()
      .map((nebula) => nebula.resources)
      .reduce((sum, num) => sum + num);
    this.add
      .rectangle(650, 40, this.availableResources, 10, 0xffffff)
      .setOrigin(0);
    this.resourcesCollectedDisplay = this.add
      .rectangle(650, 40, this.spaceship.resourcesCollected, 10, 0x69ff33)
      .setOrigin(0);
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

  updateDisplay() {
    this.timerDisplay.setText(`TIME: ${Math.round(this.timeRemaining)}`);
    if (this.timeRemaining < 10) this.timerDisplay.setColor('#fa1013');
    this.fuelLevelDisplay.setSize(this.spaceship.fuelLevel, 10);
    if (this.spaceship.fuelLevel < 10)
      this.fuelLevelDisplay.setFillStyle(0xfa1013);
    this.resourcesCollectedDisplay.setSize(
      this.spaceship.resourcesCollected,
      10
    );
  }

  updateRotations(objects) {
    objects.forEach((obj) => {
      const distance = Phaser.Math.Distance.Between(400, 400, obj.x, obj.y);
      Phaser.Actions.RotateAround([obj], { x: 400, y: 400 }, 0.3 / distance);
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
