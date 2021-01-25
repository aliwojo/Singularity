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
      this[this.controls.style].setColor('#FFFFFF');
      this.createControls();
    });
    this.add.image(400, 400, 'starfield');
    this.createControls();
    this.add
      .text(400, 150, 'Pick your control scheme', { fontSize: '30px' })
      .setOrigin(0.5);
    this.rh = this.add.text(
      100,
      250,
      '1: right hand\n\nUP=boost DOWN=stop\n> = right < = left',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.rha = this.add.text(
      500,
      250,
      '2: right hand alt\n\nI=boost K=stop\nL=right J=left',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.rhs = this.add.text(
      100,
      400,
      '3: right hand spread\n\nJ=boost ;=stop\nO=right I=left',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.lh = this.add.text(
      500,
      400,
      '4: left hand\n\nE=boost D=stop\nF=right S=left\nTAB=ENTER',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.lhs = this.add.text(
      100,
      550,
      '5: left hand spread\n\nF=boost A=stop\nE=right W=left\nTAB=ENTER',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.th = this.add.text(
      500,
      550,
      '6: two hand\n\nJ=boost K=stop\nF=right D=left',
      {
        align: 'left',
        fontSize: '20px',
      }
    );
    this.add
      .text(400, 750, 'Press SPACE to return to home screen')
      .setOrigin(0.5);

    this.createPlayer(2);
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
}
