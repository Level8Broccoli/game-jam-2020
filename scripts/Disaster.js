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

  getSuccessfullSolutionsAsTaskNumbers() {
    const successfulSolutions = [];
    this.solutions.forEach(s => {
      if (s.areAllTasksCompleted()) {
        successfulSolutions.push(s.numberOfAllTasks());
      }
    });
    return successfulSolutions;
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

  numberOfOpenTasks() {
    return this.solutions.reduce((acc, solution) => acc + solution.numberOfOpenTasks(), 0);
  }

  numberOfAllTasks() {
    return this.solutions.reduce((acc, solution) => acc + solution.numberOfAllTasks(), 0);
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
