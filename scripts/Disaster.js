import {
  assertType
} from './helpers/asserts.js';
import Solution from './Solution.js';
import * as GameState from './GameState.js';
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
    this.hasEnded = false;
    GameState.subscribeToGameRound(this);
  }

  static copy(d) {
    assertType(d, Disaster);

    return new Disaster(d.title, d.description, d.solutions.map(s => Solution.copy(s)));
  }

  isAverted() {
    let flag = false;
    this.solutions.forEach(solution => {
      assertType(solution, Solution);

      if (solution.isFinished()) {
        solution.giveReward();
        flag = true;
      }
    });
    return flag;
  }

  end() {
    this.hasEnded = true;
    this.solutions.forEach(solution => {
      assertType(solution, Solution);
      solution.removeMarbles();
    });
  }

  checkVisibility(roundNumber) {
    if (this.countdown === 0 && !this.hasEnded) {
      this.end();
    }

    if (this.hasEnded) {
      this.isVisible = false;
      return;
    }

    if (roundNumber === this.delay) {
      this.isVisible = true;
    }
  }

  nextRound(roundNumber) {
    this.countdown--;
    if (this.isAverted()) {
      this.end();
    }
    this.solutions.forEach(solution => {
      solution.freezeMarbles();
    });
    this.checkVisibility(roundNumber);
  }

  reduceSolutionsTo(n) {
    assertType(n, Number);
    if (this.solutions.length <= n) return;
    const randomIndex = randomIndexOf(this.solutions);
    this.solutions.splice(randomIndex, 1);
    this.reduceSolutionsTo(n);
  }
}
