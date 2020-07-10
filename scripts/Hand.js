export default class Hand {
  constructor() {
    this.contents = [];
  }

  add(...args) {
    this.contents.push(...args);
  }

  removeById(id) {
    this.contents = this.contents.filter(e => e.id !== id);
  }

  getContents() {
    return this.contents;
  }
}
