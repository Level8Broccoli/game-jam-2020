export default class Bag {
  constructor() {
    this.contents = [];
  }

  add(...args) {
    this.contents.push(...args);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.contents.length;
  }

  getContents() {
    return this.contents;
  }

  shuffle() {
    this.contents =
      this.contents.sort(() => .5 - Math.random());
  }

  pull() {
    if (this.isEmpty()) {
      return null;
    }
    this.shuffle();
    return this.contents.pop();
  }
}
