import 'phaser';
import BaseScene, {
  BlackHole,
  GravityZone,
  Spaceship,
  Star,
  Nebula,
} from '../BaseScene';

export default class ControlsTutorial extends BaseScene {
  constructor() {
    super('ControlsTutorial');
  }

  create() {
    this.add.image(400, 400, 'starfield');
    this.createPlayerAndControls(2);
    this.createContolsDisplay();
  }

  update() {
    if (this.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
