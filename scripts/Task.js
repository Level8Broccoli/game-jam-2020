import {
  assertSubclass,
  assertInheritance,
  assertType
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';

export default class Task {
  constructor(type) {
    assertSubclass(type, Marble);
    this.type = type;
    this.empty = true;
    this.frozen = false;
    this.done = false;
  }

  static copy(t) {
    assertType(t, Task);

    return new Task(t.type);
  }

  addMarble(marble) {
    assertInheritance(marble, Marble);
    this.empty = false;
    this.done = true;
    this.marble = marble;
  }

  removeMarble(marble) {
    assertInheritance(marble, Marble);
    this.empty = true;
    this.done = false;
    this.marble = null;
  }

  freeze() {
    this.frozen = true;
  }
}
