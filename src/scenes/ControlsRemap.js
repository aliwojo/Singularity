import 'phaser';
import controlsStore, {
  rightHandAltControls,
  rightHandControls,
  rightHandSpreadControls,
  leftHandControls,
  leftHandSpreadControls,
  twoHandControls,
} from '../redux/controlsStore';
import BaseScene from './BaseScene';
import Spaceship from '../entity/Spaceship';

export default class ControlsRemap extends BaseScene {
  constructor() {
    super('ControlsRemap');
  }

  create() {
    controlsStore.subscribe(() => {
      this[this.controls.style].setColor('#000');
      this.controls = controlsStore.getState();
      this.createPlayerAndControls(2);
    });
    this.add.image(400, 400, 'starfield');
    this.add
      .text(400, 150, 'Pick your control scheme', { fontSize: '30px' })
      .setOrigin(0.5);
    this.rh = this.add.text(300, 250, '1: right hand', {
      align: 'left',
      fontSize: '20px',
    });
    this.rha = this.add.text(300, 300, '2: right hand alt', {
      align: 'left',
      fontSize: '20px',
    });
    this.rhs = this.add.text(300, 350, '3: right hand spread', {
      align: 'left',
      fontSize: '20px',
    });
    this.lh = this.add.text(300, 400, '4: left hand', {
      align: 'left',
      fontSize: '20px',
    });
    this.lhs = this.add.text(300, 450, '5: left hand spread', {
      align: 'left',
      fontSize: '20px',
    });
    this.th = this.add.text(300, 500, '6: two hand', {
      align: 'left',
      fontSize: '20px',
    });
    this.createPlayerAndControls(2);
    this.createAnims();
    this.enter = this.input.keyboard.addKey('ENTER');
    this.space = this.input.keyboard.addKey('SPACE');
    this.one = this.input.keyboard.addKey('ONE');
    this.two = this.input.keyboard.addKey('TWO');
    this.three = this.input.keyboard.addKey('THREE');
    this.four = this.input.keyboard.addKey('FOUR');
    this.five = this.input.keyboard.addKey('FIVE');
    this.six = this.input.keyboard.addKey('SIX');
  }

  update() {
    this.spaceship.update(this.cursors);
    this[this.controls.style].setColor('#69ff33');
    if (Phaser.Input.Keyboard.JustUp(this.one)) {
      controlsStore.dispatch(rightHandControls());
    } else if (Phaser.Input.Keyboard.JustUp(this.two)) {
      controlsStore.dispatch(rightHandAltControls());
    } else if (Phaser.Input.Keyboard.JustUp(this.three)) {
      controlsStore.dispatch(rightHandSpreadControls());
    } else if (Phaser.Input.Keyboard.JustUp(this.four)) {
      controlsStore.dispatch(leftHandControls());
    } else if (Phaser.Input.Keyboard.JustUp(this.five)) {
      controlsStore.dispatch(leftHandSpreadControls());
    } else if (Phaser.Input.Keyboard.JustUp(this.six)) {
      controlsStore.dispatch(twoHandControls());
    }
    if (this.space.isDown) {
      this.scene.start('OpeningScene');
    }
  }

  updateChoice() {}
}
