import * as GameState  from './GameState.js';
import {
  assertType
} from './asserts.js';
import {
  TaskList
} from './Task.js';
import GameChanger from './GameChanger.js';
import Logger from './Logger.js';

export default class Solution {
  constructor(description, task, reward) {
    assertType(description, String);
    assertType(task, TaskList);
    assertType(reward, GameChanger);

    this.description = description;
    this.task = task;
    this.reward = reward;
  }

  addSelectedMarble() {
    this.task.addSelectedMarble(GameState.selectedMarble);
  }

  isFinished() {
    return !this.task.isInProgress();
  }

  removeMarbles() {
    console.log(this);
    this.task.list.forEach(task => {
      console.log(task.marble);
      if (task.marble) {
        task.marble.remove();
      }
      // task.empty = true;
    });
  }

  giveReward() {
    Logger.log('give reward', this.description);
  }
}
