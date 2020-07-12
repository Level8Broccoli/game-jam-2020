import {
  assertSubclass,
  assertInheritance
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';

export default class Task {
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
