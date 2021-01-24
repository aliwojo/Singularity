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
      .text(
        400,
        500,
        'Press ENTER to begin\n\nPress SPACE for tutorial\n\nPress SHIFT to choose control scheme',
        {
          align: 'center',
        }
      )
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
    this.shift = this.input.keyboard.addKey('SHIFT');
  }

  update() {
    if (this.space.isDown) {
      this.scene.start('ControlsTutorial');
    }
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
    if (this.shift.isDown) {
      this.scene.start('ControlsRemap');
    }
  }
}
