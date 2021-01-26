import 'phaser';
import controlsStore from '../redux/controlsStore';

export default class OpeningScene extends Phaser.Scene {
  constructor() {
    super('OpeningScene');
  }

  preload() {
    this.load.image('starfield', 'assets/backgrounds/starfield.png');
    this.load.audio(
      'bgmusic',
      'assets/audio/music_zapsplat_game_music_action_dark_electronic_dramatic_tension_electronica_002.mp3'
    );
    this.load.audio(
      'opening',
      'assets/audio/little_robot_sound_factory_Ambience_BlackHole_00.mp3'
    );
  }

  create() {
    this.bgMusic = this.sound.add('opening');
    this.bgMusic.setLoop(true);
    this.bgMusic.play();
    this.add.image(400, 400, 'starfield');
    this.controls = controlsStore.getState();
    this.enter = this.input.keyboard.addKey(this.controls.enter);
    this.space = this.input.keyboard.addKey(this.controls.space);
    this.shift = this.input.keyboard.addKey(this.controls.shift);
    this.add.text(400, 300, 'Singularity', { fontSize: '40px' }).setOrigin(0.5);
    this.add
      .text(
        400,
        600,
        `Press ${this.controls.enter} to begin\n\nPress SPACE for tutorial\n\nPress SHIFT to choose control scheme`,
        {
          align: 'center',
        }
      )
      .setOrigin(0.5);
    this.add
      .text(
        400,
        375,
        'Black Holes are dangerous, but the resources in orbit are valuable.\n\nYour job: Collect them, carefully.',
        { align: 'center' }
      )
      .setOrigin(0.5);
  }

  update() {
    if (this.space.isDown) {
      this.bgMusic.stop();
      this.scene.start('ControlsTutorial');
    }
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
