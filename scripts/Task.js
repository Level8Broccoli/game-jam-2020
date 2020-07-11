import {
  assertType,
  assertSubclass
} from './asserts.js';
import Marble from './marbles/Marble.js';

export default class Task {
  constructor(taskList) {
    assertType(taskList, Array);
    taskList.forEach(({
      count,
      type
    }) => {
      console.log(type);
      assertType(count, Number);
      assertSubclass(type, Marble);
    });

    this.taskList = taskList;
  }
}
