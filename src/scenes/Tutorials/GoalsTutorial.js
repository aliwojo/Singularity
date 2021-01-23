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
    this.controlsLearned = 0;
    this.learnedUp = false;
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.textOne = this.add
      .text(400, 400, 'Collect Nebulas', { fontSize: '30px', align: 'center' })
      .setOrigin(0.5);
    this.textTwo = this.add
      .text(400, 400, 'Refuel at Yellow Stars', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.textThree = this.add
      .text(400, 400, 'Avoid Neutron Stars', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.textFour = this.add
      .text(400, 400, 'Avoid the Black Hole', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.textFive = this.add
      .text(400, 400, 'When you are ready, press SPACE to continue', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.add.text(400, 700, 'Press ENTER to start playing').setOrigin(0.5);
    this.createBlackHole(2);
    this.createObjectGroups();
    this.createStar(600, 200, null, 2);
    this.createNeutronStar(200, 600, null, 1);
    this.createNebula(600, 600, null, 2);
    this.createPlayerAndControls(2);
    this.createAnims();
    this.createColliders(this.collectFuel, this.collectResources);
  }

  update() {
    this.spaceship.update(this.cursors, this.currentZone);
    switch (this.controlsLearned) {
      case 0: {
      }
      case 1: {
      }
      case 2: {
      }
      case 3: {
      }
      case 4: {
      }
    }

    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
