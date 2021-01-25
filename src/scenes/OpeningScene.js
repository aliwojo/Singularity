import 'phaser';
import controlsStore from '../redux/controlsStore';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('OpeningScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
    this.load.audio(
      'bgmusic',
      'assets/audio/music_zapsplat_game_music_action_dark_electronic_dramatic_tension_electronica_002.mp3'
    );
  }

  create() {
    this.bgMusic = this.sound.add('bgmusic');
    this.bgMusic.setLoop(true);
    this.bgMusic.play();
    this.add.image(400, 400, 'starfield');
    this.controls = controlsStore.getState();
    this.enter = this.input.keyboard.addKey(this.controls.enter);
    this.space = this.input.keyboard.addKey(this.controls.space);
    this.shift = this.input.keyboard.addKey(this.controls.shift);
    this.add
      .text(400, 300, 'Black Hole Miner', { fontSize: '40px' })
      .setOrigin(0.5);
    this.add
      .text(
        400,
        500,
        `Press ${this.controls.enter} to begin\n\nPress SPACE for tutorial\n\nPress SHIFT to choose control scheme`,
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
