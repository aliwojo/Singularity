import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
  }

  create() {
    this.add.image(400, 400, 'starfield');
  }
}
