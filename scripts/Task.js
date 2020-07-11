import {
  assertType,
  assertSubclass,
  assertInheritance
} from './asserts.js';
import Marble from './marbles/Marble.js';

export default class Task {
  constructor(taskList) {
    this.taskList = [];
    assertType(taskList, Array);
    taskList.forEach(({
      count,
      type
    }) => {
      assertType(count, Number);
      assertSubclass(type, Marble);
      for (let i = 0; i < count; i++) {
        this.taskList.push({
          type,
          empty: true
        });
      }
    });
  }

  addSelectedMarble(marble) {
    assertInheritance(marble, Marble);

    const task = this.taskList.find(task => {
      return (marble instanceof task.type && task.empty === true);
    });
    task.empty = false;
  }
}
