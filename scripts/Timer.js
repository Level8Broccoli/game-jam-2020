export default class Timer {
  constructor(rounds) {
    this.totalRounds = rounds;
    this.roundsLeft = rounds;
  }

  getRoundNumber() {
    return this.totalRounds - this.roundsLeft;
  }

  nextRound() {
    console.assert(true, 'next Round');
    this.roundsLeft--;
  }
}
