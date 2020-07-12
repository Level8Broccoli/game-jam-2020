import {
  assertType
} from './helpers/asserts.js';
import {
  randomIndexOf
} from './helpers/random.js';

export default class Resources {
  constructor() {
    this.upcoming = [];
    this.ready = [];
    this.inUse = [];
    this.used = [];
    this.removed = [];
  }

  move(id, from, to) {
    assertType(id, Number);
    assertType(from, Array);
    assertType(to, Array);

    const index = from.map(e => e.id).indexOf(id);
    const marble = from.splice(index, 1)[0];
    to.push(marble);
  }

  readyRandomMarbles(n) {
    assertType(n, Number);
    for (let i = 0; i < n; i++) {
      this.checkForReshuffling();
      if (this.upcoming.length === 0) break;
      const randomId = this.getRandomId(this.upcoming);
      this.readyMarble(randomId);
    }
  }

  readyMarble(id) {
    assertType(id, Number);
    this.checkForReshuffling();
    this.moveFromUpcomingToReady(id);
  }

  getRandomId(from) {
    assertType(from, Array);
    if (from.length === 0) return;
    const randomIndex = randomIndexOf(from);
    return from[randomIndex].id;
  }

  moveFromUpcomingToReady(id) {
    assertType(id, Number);
    this.move(id, this.upcoming, this.ready);
  }

  moveFromInUseToUsed(id) {
    assertType(id, Number);
    this.move(id, this.inUse, this.used);
  }

  moveFromReadyToInUse(id) {
    assertType(id, Number);
    this.move(id, this.ready, this.inUse);
  }

  useMarble(id) {
    assertType(id, Number);
    this.move(id, this.ready, this.used);
  }

  getState(id) {
    assertType(id, Number);
    if (this.upcoming.find(e => e.id === id)) {
      return 'upcoming';
    }
    if (this.ready.find(e => e.id === id)) {
      return 'ready';
    }
    if (this.inUse.find(e => e.id === id)) {
      return 'inUse';
    }
    if (this.used.find(e => e.id === id)) {
      return 'used';
    }
    if (this.deleted.find(e => e.id === id)) {
      return 'deleted';
    }
  }

  moveAll(from, to) {
    assertType(from, Array);
    assertType(to, Array);
    to.push(...from.splice(0));
  }

  checkForReshuffling() {
    if (this.upcoming.length === 0) {
      this.moveAll(this.used, this.upcoming);
    }
  }
}
