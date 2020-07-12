export default class PopulationCounter {
  constructor() {
    this.population = 0; // TODO: Reverse at the end
  }

  reduceBy(n) {
    this.population -= n;
  }
}
