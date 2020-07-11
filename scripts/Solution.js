import GameState from './GameState.js';

export default class Solution {
  constructor(description, task, reward) {
    this.description = description;
    this.task = task;
    this.reward = reward;
  }

  addSelectedMarble() {
    const selectedMarble = GameState.getSelectedMarble();
    this.task.addSelectedMarble(selectedMarble);
    GameState.removeSelectedMarble();
  }
}
