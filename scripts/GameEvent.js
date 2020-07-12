import { assertType } from './helpers/asserts.js';
import Hotspot from './Hotspot.js';
import Disaster from './Disaster.js';

export default class GameEvent {
  constructor(hotspot, disaster) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);

    this.hotspot = hotspot;
    this.disaster = disaster;
  }
}
