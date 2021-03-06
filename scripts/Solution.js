import {
  assertType
} from './helpers/asserts.js';
import Logger from './helpers/Logger.js';
import Task from './Task.js';

export default class Solution {
  constructor(title, description, tasks) {
    assertType(title, String);
    assertType(description, String);
    assertType(tasks, Array);

    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }

  static copy(s) {
    assertType(s, Solution);

    return new Solution(s.title, s.description, s.tasks.map(t => Task.copy(t)));
  }

  numberOfOpenTasks() {
    return this.tasks.reduce((acc, task) => acc + (task.done ? 0 : 1), 0);
  }

  numberOfAllTasks() {
    return this.tasks.length;
  }

  areAllTasksCompleted() {
    return this.tasks.reduce((bool, task) => task.done && bool, true);
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

  freezeMarbles() {
    this.tasks.forEach(task => {
      if (task.marble) {
        task.freeze();
      }
    });
  }
}
