import {
  assertType
} from './helpers/asserts.js';
import Hotspot from './Hotspot.js';
import Disaster from './Disaster.js';
import * as GameState from './GameState.js';

export default class GameEvent {
  constructor(hotspot, disaster, countdown = 3) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);
    assertType(countdown, Number);

    this.countdown = countdown;
    this.hotspot = hotspot;
    this.disaster = disaster;

    GameState.subscribeToGameRound(this);
  }

  static build(hotspot, disaster, solutionCount = 2, countdown = 3) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);

    const hotspotCopy = Hotspot.copy(hotspot);
    const disasterCopy = Disaster.copy(disaster);
    assertType(hotspotCopy, Hotspot);
    assertType(disasterCopy, Disaster);

    // individualize
    disasterCopy.reduceSolutionsRandomlyTo(solutionCount);
    disasterCopy.title = disaster.title.replace(/@/, hotspot.name);

    return new GameEvent(hotspotCopy, disasterCopy, countdown);
  }

  atLeastOneTaskIsCompleted() {
    return this.disaster.atLeastOneTaskIsCompleted();
  }

  end() {
    this.disaster.removeMarbles();
    GameState.removeGameEvent(this);
  }

  nextRound() {
    this.countdown--;
    if (this.countdown === 0 || this.atLeastOneTaskIsCompleted()) {
      this.end();
    }
    this.disaster.freezeMarbles();
  }
}
