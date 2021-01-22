/** @type {import("../typings/phaser")} */

import 'phaser';
import config from './config/config';
import MainScene from './scenes/MainScene';
import BgScene from './scenes/BgScene';
import FgScene from './scenes/FgScene';
import OpeningScene from './scenes/OpeningScene';
import EndScene from './scenes/WinScene';
import GameOverScene from './scenes/GameOverScene';
import ControlsTutorial from './scenes/Tutorials/ControlsTutorial';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('ControlsTutorial', ControlsTutorial);
    this.scene.add('BgScene', BgScene);
    this.scene.add('FgScene', FgScene);
    this.scene.add('MainScene', MainScene);
    this.scene.add('OpeningScene', OpeningScene);
    this.scene.add('WinScene', EndScene);
    this.scene.add('GameOverScene', GameOverScene);

    this.scene.start('OpeningScene');
  }
}

window.onload = function () {
  window.game = new Game();
};
