import 'phaser';
import BaseScene from '../BaseScene';

export default class ControlsTutorial extends BaseScene {
  constructor() {
    super('ControlsTutorial');
    this.controlsLearned = 0;
    this.learnedUp = false;
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.createPlayerAndControls(2);
    this.createAnims();
    this.textOne = this.add
      .text(
        400,
        400,
        'Press UP button to boost forward\n\nBoosts can be stacked to increase speed',
        { fontSize: '30px', align: 'center' }
      )
      .setOrigin(0.5);
    this.textTwo = this.add
      .text(400, 400, 'Press DOWN to stop', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.textThree = this.add
      .text(400, 400, 'Press > to rotate right', {
        fontSize: '30px',
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.textFour = this.add
      .text(400, 400, 'Press < to rotate left', {
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
  }

  update() {
    this.spaceship.update(this.cursors, this.currentZone);
    switch (this.controlsLearned) {
      case 0: {
        if (this.cursors.up.isDown) {
          if (this.learnedUp) {
            this.textOne.setVisible(false);
            this.textTwo.setVisible(true);
            this.controlsLearned = 1;
          }
          this.learnedUp = true;
        }
      }
      case 1: {
        if (this.cursors.down.isDown) {
          this.textTwo.setVisible(false);
          this.textThree.setVisible(true);
          this.controlsLearned = 2;
        }
      }
      case 2: {
        if (this.cursors.right.isDown) {
          this.textThree.setVisible(false);
          this.textFour.setVisible(true);
          this.controlsLearned = 3;
        }
      }
      case 3: {
        if (this.cursors.left.isDown) {
          this.textFour.setVisible(false);
          this.textFive.setVisible(true);
          this.controlsLearned = 4;
        }
      }
      case 4: {
        if (this.cursors.space.isDown) {
          this.scene.start('GoalsTutorial');
        }
      }
    }

    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
