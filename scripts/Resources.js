export default class Resources {
  constructor() {
    this.upcoming = [];
    this.ready = [];
    this.inUse = [];
    this.used = [];
    this.removed = [];
  }

  move(id, from, to) {
    const index = from.map(e => e.id).indexOf(id);
    const action = from.splice(index, 1)[0];
    to.push(action);

    this.checkForReshuffling();
  }

  readyAction(id) {
    if (!id) {
      id = this.getRandomId(this.upcoming);
    }
    this.moveFromUpcomingToReady(id);
  }

  getRandomId(from) {
    return from[Math.floor(Math.random() * from.length)].id;
  }

  moveFromUpcomingToReady(id) {
    this.move(id, this.upcoming, this.ready);
  }

  useAction(id) {
    this.move(id, this.ready, this.used);
  }

  getState(id) {
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
    to.push(...from.splice(0));
  }

  checkForReshuffling() {
    if (this.upcoming.length === 0) {
      this.moveAll(this.used, this.upcoming);
    }
  }
}
