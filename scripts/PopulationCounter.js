
export default class PopulationCounter {
  constructor(startPopulation = 7.594) {
    // current world population 7.594 Billions (de: Milliarden)
    this.population = startPopulation;
    this.startPopulation = startPopulation;
    this.factors = [];
  }

  reduceBy(n) {
    this.population -= n;
  }

  addToBy(n) {
    this.population += n;
  }

  disasterStruck() {
    this.reduceBy(this.startPopulation / 15);
  }

  disasterAvoided() {
    this.addToBy(this.startPopulation / 25);
  }

  nextRound() {
    this.factors.forEach(factor => this.population *= factor);
    this.factors = [];
  }
}
