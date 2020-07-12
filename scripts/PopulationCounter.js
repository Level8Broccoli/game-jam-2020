
export default class PopulationCounter {
  constructor() {
    this.population = 7.594; // current world population in Billions (de: Milliarden)
    this.factors = [];
  }

  reduceBy(n) {
    this.population -= n;
  }

  addToBy(n) {
    this.population += n;
  }

  disasterStruck() {
    this.reduceBy(0.5);
  }

  disasterAvoided() {
    this.addToBy(0.3);
  }

  nextRound() {
    this.factors.forEach(factor => this.population *= factor);
    this.factors = [];
  }
}
