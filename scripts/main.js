import * as GameState from './GameState.js';
import * as TestView from './ui/testView.js';

document.addEventListener('DOMContentLoaded', async () => {
  await GameState.initState();
  GameState.startGame();
  TestView.updateUi();
});

window.GameState = GameState;
