import 'phaser';
import BaseScene from './BaseScene';

import BlackHole from '../entity/BlackHole';
import GravityZone from '../entity/GravityZone';
import Spaceship from '../entity/Spaceship';
import Star from '../entity/Star';
import Nebula from '../entity/Nebula';

export default class FgScene extends BaseScene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.currentZone = 0;
    this.timeRemaining = 30;
    this.blackHoleCollision = false;

    //sprites
    this.createBlackHole();
    this.createObjectGroups();

    this.createGavityZones();

    this.createStar(150, 150);
    this.createStar(650, 650);
    this.createStar(150, 650);
    this.createStar(650, 150);

    this.createNeutronStar(300, 200);
    this.createNeutronStar(200, 300);
    this.createNeutronStar(600, 300);
    this.createNeutronStar(300, 600);

    this.createNebula(200, 200);
    this.createNebula(200, 400);
    this.createNebula(400, 200);
    this.createNebula(400, 600);
    this.createNebula(300, 300);
    this.createNebula(300, 500);
    this.createNebula(350, 350);
    this.createNebula(600, 400);
    this.createNebula(500, 500);
    this.createNebula(450, 350);
    this.createNebula(600, 200);

    this.createPlayer(1);
    this.createControls();

    //timed events
    this.timer = 30;
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: function () {
        this.timeRemaining -= 1 / (2 * this.currentZone);
      },
      callbackScope: this,
    });

    //animations and tweens
    this.createAnims();

    this.tweens.add({
      targets: [this.blackHole, ...this.gravityZoneGroup.getChildren()],
      duration: 500000,
      ease: 'Power2',
      angle: 360,
      repeat: -1,
    });

    //colliders
    this.createColliders(
      this.collectFuel,
      this.collectResources,
      this.gameOver,
      this.gameOver
    );

    //text
    this.createStatusDisplay();
    this.createContolsDisplay();
  }

  update() {
    this.setCurrentZone();
    this.spaceship.update(this.cursors, this.currentZone);
    this.updateText();
    this.updateRotations([
      ...this.starGroup.getChildren(),
      ...this.nebulaGroup.getChildren(),
      ...this.neutronGroup.getChildren(),
    ]);
    this.statusEndGame();
  }
}
