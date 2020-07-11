import {
  assertType
} from './asserts.js';

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

    this.checkForReshuffling();
  }

  readyMarble(id) {
    if (!id) {
      id = this.getRandomId(this.upcoming);
    }
    assertType(id, Number);
    this.moveFromUpcomingToReady(id);
  }

  getRandomId(from) {
    assertType(from, Array);
    return from[Math.floor(Math.random() * from.length)].id;
  }

  moveFromUpcomingToReady(id) {
    assertType(id, Number);
    this.move(id, this.upcoming, this.ready);
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
