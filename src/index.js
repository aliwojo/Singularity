/** @type {import("../typings/phaser")} */

import 'phaser';
import config from './config/config';
import MainScene from './scenes/MainScene';
import OpeningScene from './scenes/OpeningScene';
import { GameOverScene, WinScene } from './scenes/EndScene';
import ControlsTutorial from './scenes/Tutorials/ControlsTutorial';
import GoalsTutorial from './scenes/Tutorials/GoalsTutorial';
import EndStateTutorial from './scenes/Tutorials/EndStateTutorial';
import ControlsRemap from './scenes/ControlsRemap';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('ControlsTutorial', ControlsTutorial);
    this.scene.add('GoalsTutorial', GoalsTutorial);
    this.scene.add('EndStateTutorial', EndStateTutorial);
    this.scene.add('ControlsRemap', ControlsRemap);
    this.scene.add('MainScene', MainScene);
    this.scene.add('OpeningScene', OpeningScene);
    this.scene.add('WinScene', WinScene);
    this.scene.add('GameOverScene', GameOverScene);

    this.scene.start('OpeningScene');
  }
}

window.onload = function () {
  window.game = new Game();
};
