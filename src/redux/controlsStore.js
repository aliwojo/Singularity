import { createStore } from 'redux';

const rightHand = {
  style: 'rh',
  up: 'UP',
  down: 'DOWN',
  left: 'LEFT',
  right: 'RIGHT',
  enter: 'ENTER',
  space: 'SPACE',
  shift: 'SHIFT',
};

const leftHand = {
  style: 'lh',
  up: 'E',
  down: 'D',
  left: 'S',
  right: 'F',
  enter: 'TAB',
  space: 'SPACE',
  shift: 'SHIFT',
};

const rightHandAlt = {
  style: 'rha',
  up: 'I',
  down: 'K',
  left: 'J',
  right: 'L',
  enter: 'ENTER',
  space: 'SPACE',
  shift: 'SHIFT',
};

const leftHandSpread = {
  style: 'lhs',
  up: 'F',
  down: 'A',
  left: 'W',
  right: 'E',
  enter: 'TAB',
  space: 'SPACE',
  shift: 'SHIFT',
};

const rightHandSpread = {
  style: 'rhs',
  up: 'J',
  down: 'COLON',
  left: 'I',
  right: 'O',
  enter: 'ENTER',
  space: 'SPACE',
  shift: 'SHIFT',
};

const twoHand = {
  style: 'th',
  up: 'J',
  down: 'K',
  left: 'D',
  right: 'F',
  enter: 'ENTER',
  space: 'SPACE',
  shift: 'SHIFT',
};

const RIGHT_HAND_ALT = 'RIGHT_HAND_ALT';
const LEFT_HAND = 'LEFT_HAND';
const LEFT_HAND_SPREAD = 'LEFT_HAND_SPREAD';
const RIGHT_HAND_SPREAD = 'RIGHT_HAND_SPREAD';
const TWO_HAND = 'TWO_HAND';
const RIGHT_HAND = 'RIGHT_HAND';

export const rightHandAltControls = () => ({
  type: RIGHT_HAND_ALT,
});

export const rightHandControls = () => ({
  type: RIGHT_HAND,
});

export const rightHandSpreadControls = () => ({
  type: RIGHT_HAND_SPREAD,
});

export const leftHandSpreadControls = () => ({
  type: LEFT_HAND_SPREAD,
});

export const leftHandControls = () => ({
  type: LEFT_HAND,
});

export const twoHandControls = () => ({
  type: TWO_HAND,
});

function controlsReducer(state = rightHand, action) {
  switch (action.type) {
    case RIGHT_HAND_ALT:
      return rightHandAlt;
    case LEFT_HAND:
      return leftHand;
    case LEFT_HAND_SPREAD:
      return leftHandSpread;
    case RIGHT_HAND_SPREAD:
      return rightHandSpread;
    case TWO_HAND:
      return twoHand;
    case RIGHT_HAND:
      return rightHand;
    default:
      return state;
  }
}

const controlsStore = createStore(controlsReducer);

export default controlsStore;
