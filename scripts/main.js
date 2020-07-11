import * as GameState  from './GameState.js';
import { updateUi } from './ui.js';

GameState.initState();
updateUi();

window.GameState = GameState;
