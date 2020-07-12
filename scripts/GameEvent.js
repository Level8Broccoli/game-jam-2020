import {
  assertType
} from './helpers/asserts.js';
import Hotspot from './Hotspot.js';
import Disaster from './Disaster.js';

export default class GameEvent {
  constructor(hotspot, disaster) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);

    this.hotspot = hotspot;
    this.disaster = disaster;
  }

  static build(hotspot, disaster, solutionCount = 2) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);

    const hotspotCopy = Hotspot.copy(hotspot);
    const disasterCopy = Disaster.copy(disaster);
    assertType(hotspotCopy, Hotspot);
    assertType(disasterCopy, Disaster);

    // individualize
    disasterCopy.reduceSolutionsTo(solutionCount);
    disasterCopy.title = disaster.title.replace(/@/, hotspot.name);

    return new GameEvent(hotspotCopy, disasterCopy);
  }
}
