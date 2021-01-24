import { createStore } from 'redux';

const initialState = { up: 'W', down: 'S', left: 'A', right: 'D' };

const REMAP_CONTROLS = 'REMAP_CONTROLS';
const RESET_CONTROLS = 'RESET_CONTROLS';

export const remapControls = (keys) => ({
  type: REMAP_CONTROLS,
  keys,
});

export const resetControls = () => ({
  type: RESET_CONTROLS,
});

function controlsReducer(state = initialState, action) {
  switch (action.type) {
    case REMAP_CONTROLS:
      return action.keys;
    case RESET_CONTROLS:
      return initialState;
    default:
      return state;
  }
}

const controlsStore = createStore(controlsReducer);

export default controlsStore;
