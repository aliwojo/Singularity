import { createStore } from 'redux';


const initialState = {up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT'}

const REMAP_CONTROLS = 'REMAP_CONTROLS'
const RESET_CONTROLS = 'RESET_CONTROLS'

function controlsReducer(state = initialState, action)
