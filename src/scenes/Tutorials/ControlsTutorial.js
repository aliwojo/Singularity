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
    this.createAnims();
    this.add.tileSprite(100, 400, 'Press UP button to boost forward');
  }

  update() {
    this.spaceship.update(this.cursors, this.currentZone);
    if (this.cursors.enter.isDown) {
      this.scene.start('MainScene');
    }
  }
}
