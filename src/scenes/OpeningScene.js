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
    this.add.text(400, 550, 'Press ENTER to begin').setOrigin(0.5);
    this.add
      .text(
        400,
        350,
        'Collect all available resources before time or fuel runs out'
      )
      .setOrigin(0.5);
    this.add
      .text(
        400,
        420,
        'Rotate the ship with < and > keys\nBoost forward with UP key\nStop with DWN key\nRefuel at stars, collect resources at nebulas\nTime slows and fuel consumption increases as you approach the black hole\nEntering the event horizon brings death',
        { align: 'center' }
      )
      .setOrigin(0.5);
    this.enter = this.input.keyboard.addKey('ENTER');
  }

  update() {
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
