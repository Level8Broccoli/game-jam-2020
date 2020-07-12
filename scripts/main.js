import * as GameState from './GameState.js';
import * as TestView from './ui/testView.js';

document.addEventListener('DOMContentLoaded', async () => {
  const levels = await fetch('/assets/maps/maps.json').then(r => r.json());
  const levelNames = levels.map(lvl => lvl.name);
  const currentLevel = levelNames[Math.floor(Math.random() * levelNames.length)];

  await GameState.initState(currentLevel);
  GameState.startGame();
  TestView.updateUi();
});

window.GameState = GameState;
