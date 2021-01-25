import 'phaser';
import BaseScene, {
  BlackHole,
  GravityZone,
  Spaceship,
  Star,
  Nebula,
} from '../BaseScene';

export default class GoalsTutorial extends BaseScene {
  constructor() {
    super('GoalsTutorial');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.createControls();
    this.textOne = this.add
      .text(400, 450, 'AVOID THE BLACK HOLE', {
        fontSize: '20px',
        align: 'center',
      })
      .setOrigin(0.5);
    this.textTwo = this.add
      .text(200, 650, 'Refuel once at each\nYellow Stars', {
        fontSize: '20px',
        align: 'center',
      })
      .setOrigin(0.5);
    this.textThree = this.add
      .text(600, 650, 'Avoid Neutron Stars', {
        fontSize: '20px',
      })
      .setOrigin(0.5);
    this.textFour = this.add
      .text(400, 150, 'Collect Nebulas before fuel runs out to WIN', {
        fontSize: '20px',
      })
      .setOrigin(0.5);
    this.add
      .text(400, 750, `Press ${this.controls.enter} to start playing`)
      .setOrigin(0.5);
    this.createBlackHole();
    this.createObjectGroups();
    this.createStar(200, 600, 2);
    this.createNeutronStar(600, 600, 1);
    this.createNebula(200, 250, 2);
    this.createNebula(600, 250, 2);
    this.createPlayer(2);
    this.createAnims();
    this.createColliders(this.collectFuel, this.collectResources);
    this.createContolsDisplay();
    this.createStatusDisplay();
  }

  update() {
    this.setCurrentZone();
    this.spaceship.update(this.cursors, this.currentZone);
    this.updateDisplay();
    if (this.spaceship.resourcesCollected === this.availableResources) {
      this.textFour.setText('Press SPACE to continue tutorial');
      if (this.cursors.space.isDown) {
        this.scene.start('EndStateTutorial');
      }
    }
    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
