import * as GameState  from './GameState.js';
import * as TestView from './ui/testView.js';

GameState.initState();
TestView.updateUi();

window.GameState = GameState;
