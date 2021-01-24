import 'phaser';
import controlsStore from '../redux/controlsStore';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.controls = controlsStore.getState();
    this.enter = this.input.keyboard.addKey(this.controls.enter);
    this.add.text(400, 400, 'YOU WON!!', { fontSize: '40px' }).setOrigin(0.5);
    this.add
      .text(400, 500, `Press ${this.controls.enter} to play again`)
      .setOrigin(0.5);
    this.add
      .text(400, 550, `Press ${this.controls.shift} to change controls`)
      .setOrigin(0.5);
    this.enter = this.input.keyboard.addKey(this.controls.enter);
    this.shift = this.input.keyboard.addKey(this.controls.shift);
    const mainScene = this.scene.get('MainScene');
    mainScene.scene.restart();
    this.scene.pause('MainScene');
  }

  update() {
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
    if (this.shift.isDown) {
      this.scene.start('ControlsRemap');
    }
  }
}
