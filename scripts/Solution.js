import {
  assertType
} from './helpers/asserts.js';
import Logger from './helpers/Logger.js';

export default class Solution {
  constructor(title, description, tasks) {
    assertType(title, String);
    assertType(description, String);
    assertType(tasks, Array);

    this.description = description;
    this.tasks = tasks;
  }

  isFinished() {
    let flag = false;
    this.tasks.forEach(task => {
      if (task.empty) {
        flag = true;
      }
    });
    return flag;
  }

  removeMarbles() {
    this.tasks.forEach(task => {
      if (task.marble) {
        task.marble.remove();
        task.marble = null;
      }
      task.empty = true;
    });
  }

  giveReward() {
    Logger.log('give reward', this.description);
  }

  freezeMarbles() {
    this.tasks.forEach(task => {
      if (task.marble) {
        task.freeze();
      }
    });
  }
}
