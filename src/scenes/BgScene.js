import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield_1.png');
  }

  create() {
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    this.image.add(400, 400, 'starfield');
  }
}
