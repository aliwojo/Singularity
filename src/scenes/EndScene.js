import 'phaser';
import controlsStore from '../redux/controlsStore';

class EndScene extends Phaser.Scene {
  constructor(name, message) {
    super(name);
    this.message = message;
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
    this.add.text(400, 400, this.message, { fontSize: '40px' }).setOrigin(0.5);
    this.add
      .text(400, 500, `Press ${this.controls.enter} to play again`)
      .setOrigin(0.5);
    this.add
      .text(400, 550, `Press ${this.controls.shift} to change controls`)
      .setOrigin(0.5);
    this.enter = this.input.keyboard.addKey(this.controls.enter);
    this.shift = this.input.keyboard.addKey(this.controls.shift);
  }

  update() {
    if (this.enter.isDown) {
      this.bgMusic.stop();
      this.scene.start('MainScene');
    }
    if (this.shift.isDown) {
      this.bgMusic.stop();
      this.scene.start('ControlsRemap');
    }
  }
}

export const WinScene = new EndScene('WinScene', 'YOU WIN!!!');

export const GameOverScene = new EndScene('GameOverScene', 'GAME OVER');
