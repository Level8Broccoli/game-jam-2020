export default class Timer {
  constructor(rounds) {
    this.roundsLeft = rounds;
  }

  nextRound() {
    this.roundsLeft--;
  }
}
