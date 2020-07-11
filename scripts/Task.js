import {
  assertType,
  assertSubclass
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
          state: null
        });
      }
    });

  }
}
