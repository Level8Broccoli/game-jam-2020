import {
  assertType
} from './helpers/asserts.js';
import Solution from './Solution.js';
import {
  randomIndexOf
} from './helpers/random.js';

export default class Disaster {
  constructor(title, description, solutions) {
    assertType(title, String);
    assertType(description, String);
    assertType(solutions, Array);

    this.title = title;
    this.description = description;
    this.solutions = solutions;
  }

  static copy(d) {
    assertType(d, Disaster);

    return new Disaster(d.title, d.description, d.solutions.map(s => Solution.copy(s)));
  }

  removeMarbles() {
    this.solutions.forEach(solution => {
      solution.removeMarbles();
    });
  }

  freezeMarbles() {
    this.solutions.forEach(solution => {
      solution.freezeMarbles();
    });
  }

  reduceSolutionsRandomlyTo(n) {
    assertType(n, Number);
    if (this.solutions.length <= n) return;
    const randomIndex = randomIndexOf(this.solutions);
    this.solutions.splice(randomIndex, 1);
    this.reduceSolutionsRandomlyTo(n);
  }

  atLeastOneTaskIsCompleted() {
    return this.solutions.reduce((bool, solution) => solution.areAllTasksCompleted() || bool, false);
  }
}
