import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.add.text(400, 400, 'YOU WON!!', { fontSize: '40px' }).setOrigin(0.5);
    this.add.text(400, 500, 'Press ENTER to play again').setOrigin(0.5);
    this.enter = this.input.keyboard.addKey('ENTER');
    const mainScene = this.scene.get('MainScene');
    mainScene.scene.restart();
    this.scene.pause('MainScene');
  }

  update() {
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
