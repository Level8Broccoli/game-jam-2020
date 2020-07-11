import { assertType } from './asserts.js';
import Solution from './Solution.js';
import GameChanger from './GameChanger.js';

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
  }
}
