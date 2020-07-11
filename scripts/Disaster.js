import {
  assertType
} from './helpers/asserts.js';
import GameChanger from './GameChanger.js';
import Solution from './Solution.js';
import * as GameState from './GameState.js';

export default class Disaster {
  constructor(description, solutions, delay, countdown, consequence) {
    assertType(description, String);
    assertType(solutions, Array);
    assertType(delay, Number);
    assertType(countdown, Number);
    assertType(consequence, GameChanger);

    this.location = location;
    this.description = description;
    this.solutions = solutions;
    this.delay = delay;
    this.countdown = countdown + delay;
    this.consequence = consequence;
    this.hasEnded = false;
    this.isVisible = delay === 0;
    GameState.subscribeToGameRound(this);
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
    if (this.countdown === 0) {
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
}
