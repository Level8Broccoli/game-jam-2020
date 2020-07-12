import {
  assertType,
  assertSubclass,
  assertInheritance
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';

export class Task {
  constructor(type) {
    assertSubclass(type, Marble);
    this.type = type;
    this.empty = true;
    this.frozen = false;
  }

  addMarble(marble) {
    assertInheritance(marble, Marble);
    this.empty = false;
    this.marble = marble;
  }

  removeMarble(marble) {
    assertInheritance(marble, Marble);
    this.empty = true;
    this.marble = null;
  }

  freeze() {
    this.frozen = true;
  }
}

export class TaskList {
  constructor(taskList) {
    this.list = [];
    assertType(taskList, Array);
    taskList.forEach(({
      count,
      type
    }) => {
      assertType(count, Number);
      assertSubclass(type, Marble);

      for (let i = 0; i < count; i++) {
        this.list.push(new Task(type));
      }
    });
  }

  isInProgress() {
    let flag = false;
    this.list.forEach(task => {
      if (task.empty) {
        flag = true;
      }
    });
    return flag;
  }
}
