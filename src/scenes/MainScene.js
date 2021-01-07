import 'phaser';
import BgScene from './BgScene';
import FgScene from './FgScene';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.gameOver = FgScene.gameOver;
  }

  create() {
    this.scene.launch('BgScene');
    this.scene.launch('FgScene');
  }
}
