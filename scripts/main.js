import * as GameState  from './GameState.js';
import * as TestView from './ui/testView.js';

GameState.initState();
GameState.startGame();
TestView.updateUi();

window.GameState = GameState;
