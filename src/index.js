/** @type {import("../typings/phaser")} */

import 'phaser';
import config from './config/config';
import MainScene from './scenes/MainScene';
import BgScene from './scenes/BgScene';
import FgScene from './scenes/FgScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('BgScene', BgScene);
    this.scene.add('FgScene', FgScene);
    this.scene.add('MainScene', MainScene);

    this.scene.start('MainScene');
  }
}

window.onload = function () {
  window.game = new Game();
};
