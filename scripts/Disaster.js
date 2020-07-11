import {
  assertType
} from './helpers/asserts.js';
import GameChanger from './GameChanger.js';
import Solution from './Solution.js';
import * as GameState from './GameState.js';

export default class Disaster {
  constructor(description, solutions, countdown, consequence) {
    assertType(description, String);
    assertType(solutions, Array);
    assertType(countdown, Number);
    assertType(consequence, GameChanger);

    this.location = location;
    this.description = description;
    this.solutions = solutions;
    this.countdown = countdown;
    this.consequence = consequence;
    this.finished = false;
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
    this.finished = true;
    this.solutions.forEach(solution => {
      assertType(solution, Solution);
      solution.removeMarbles();
    });
  }

  nextRound() {
    if (this.isAverted()) {
      this.end();
    }
    this.solutions.forEach(solution => {
      solution.freezeMarbles();
    });
  }
}
