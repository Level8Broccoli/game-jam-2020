import {
  assertType
} from './helpers/asserts.js';

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
    const reduceByCount = this.startPopulation / 12;
    console.log('Population loss -', reduceByCount);
    this.reduceBy(reduceByCount);
  }

  disasterAvoided(size) {
    const mediumSize = this.startPopulation / 25;
    const smallSize = mediumSize * 0.75;
    const largeSize = mediumSize * 0.25;

    if (size === 'small') {
      this.addToBy(smallSize);
      console.log('Small Population Boost +', smallSize);
    } else if (size === 'large') {
      this.addToBy(largeSize);
      console.log('Large Population Boost +', largeSize);
    } else {
      this.addToBy(mediumSize);
      console.log('Medium Population Boost +', mediumSize);
    }
  }

  nextRound() {
    this.factors.forEach(factor => this.population *= factor);
    this.factors = [];
  }
}
