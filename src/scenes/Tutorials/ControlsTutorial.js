import 'phaser';
import BaseScene from '../BaseScene';

export default class ControlsTutorial extends BaseScene {
  constructor() {
    super('ControlsTutorial');
    this.stage = 'boost';
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
    if (this.cursors.up.isDown && this.stage === 'boost') {
      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: function () {
          this.textOne.setVisible(false);
          this.textTwo.setVisible(true);
          this.stage = 'stop';
        },
        callbackScope: this,
      });
      this.stage = 'boost2';
    }
    if (this.cursors.down.isDown && this.stage === 'stop') {
      this.textTwo.setVisible(false);
      this.textThree.setVisible(true);
      this.stage = 'right';
    }
    if (this.cursors.right.isDown && this.stage === 'right') {
      this.textThree.setVisible(false);
      this.textFour.setVisible(true);
      this.stage = 'left';
    }
    if (this.cursors.left.isDown && this.stage === 'left') {
      this.textFour.setVisible(false);
      this.textFive.setVisible(true);
      this.stage = 'continue';
    }
    if (this.cursors.space.isDown && this.stage === 'continue') {
      this.scene.start('GoalsTutorial');
    }

    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
