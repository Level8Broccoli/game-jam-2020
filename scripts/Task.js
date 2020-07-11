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
  }

  addMarble(marble) {
    assertInheritance(marble, Marble);
    console.log('add Marble', this);
    this.empty = false;
    this.marble = marble;
  }

  removeMarble(marble) {
    assertInheritance(marble, Marble);
    this.empty = true;
    this.marble = null;
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

  addSelectedMarble(marble) {
    assertInheritance(marble, Marble);

    const task = this.list.find(task => {
      return (marble instanceof task.type && task.empty === true);
    });
    task.addMarble(marble);
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
