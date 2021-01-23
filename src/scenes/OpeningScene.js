import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('OpeningScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.add
      .text(400, 300, 'Black Hole Miner', { fontSize: '40px' })
      .setOrigin(0.5);
    this.add
      .text(400, 550, 'Press ENTER to begin\nPress SPACE for tutorial', {
        align: 'center',
      })
      .setOrigin(0.5);
    this.add
      .text(
        400,
        350,
        'Black Holes are dangerous, but the resources in orbit are valuable'
      )
      .setOrigin(0.5);
    this.enter = this.input.keyboard.addKey('ENTER');
    this.space = this.input.keyboard.addKey('SPACE');
  }

  update() {
    if (this.space.isDown) {
      this.scene.start('ControlsTutorial');
    }
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
