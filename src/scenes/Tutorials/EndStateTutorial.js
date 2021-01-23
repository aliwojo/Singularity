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
    super('EndStateTutorial');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.textOne = this.add
      .text(400, 300, 'BLACK HOLE and NEUTRON STARS = DEATH', {
        fontSize: '20px',
        align: 'center',
      })
      .setOrigin(0.5);
    this.textTwo = this.add
      .text(
        400,
        500,
        'Fuel consumption increases\nand time slows the closer\nyou are to the BLACK HOLE',
        {
          fontSize: '20px',
          align: 'center',
        }
      )
      .setOrigin(0.5);
    this.textThree = this.add
      .text(400, 600, '', {
        fontSize: '30px',
      })
      .setOrigin(0.5);
    this.textFour = this.add
      .text(400, 150, '', {
        fontSize: '20px',
      })
      .setOrigin(0.5);
    this.add.text(400, 750, 'Press ENTER to start playing').setOrigin(0.5);
    this.createBlackHole(1);
    this.createObjectGroups();
    this.createGavityZones();
    this.createStar(200, 600);
    this.createNeutronStar(600, 600);
    this.createNebula(200, 250);
    this.createNebula(600, 250);
    this.createPlayerAndControls(1);
    this.createAnims();
    this.createColliders(
      this.collectFuel,
      this.collectResources,
      this.fakeGameOver,
      this.fakeGameOver
    );
    this.createContolsDisplay();
    this.createStatusDisplay();
  }

  update() {
    this.setCurrentZone();
    this.spaceship.update(this.cursors, this.currentZone);
    this.updateRotations([
      ...this.starGroup.getChildren(),
      ...this.nebulaGroup.getChildren(),
      ...this.neutronGroup.getChildren(),
    ]);
    this.updateText();
    if (this.spaceship.resourcesCollected === this.availableResources) {
      this.textFour.setText('Press SPACE or ENTER to start playing');
      if (this.cursors.space.isDown) {
        this.scene.start('MainScene');
      }
    }
    if (this.spaceship.fuelLevel === 0) {
      this.fakeGameOver();
      this.fuelLevelDisplay.setColor('#69ff33');
      this.spaceship.fuelLevel = 100;
    }
    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }

  fakeGameOver() {
    this.textThree.setText('GAME OVER');
    this.time.addEvent({
      delay: 1000,
      loop: false,
      callback: function () {
        this.textThree.setText('');
      },
      callbackScope: this,
    });
  }
}
