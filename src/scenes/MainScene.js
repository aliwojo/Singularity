import 'phaser';
import BgScene from './BgScene';
import FgScene from './FgScene';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    this.scene.launch('BgScene');
    this.scene.launch('FgScene');
  }
}
