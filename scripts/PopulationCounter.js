import { assertType } from './helpers/asserts.js';

export default class PopulationCounter {
  constructor(startPopulation = 7.594) {
    // current world population 7.594 Billions (de: Milliarden)
    this.population = startPopulation;
    this.startPopulation = startPopulation;
    this.factors = [];
  }

  reduceBy(n) {
    assertType(n, Number);
    this.population -= n;
  }

  addToBy(n) {
    assertType(n, Number);
    this.population += n;
  }

  disasterStruck() {
    this.reduceBy(this.startPopulation / 12);
  }

  disasterAvoided() {
    this.addToBy(this.startPopulation / 25);
  }

  nextRound() {
    this.factors.forEach(factor => this.population *= factor);
    this.factors = [];
  }
}
