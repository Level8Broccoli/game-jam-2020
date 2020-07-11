import Resources from './Resources.js';
import {
  initResources,
  initDisasters
} from './setup.js';
import {
  assertInheritance
} from './asserts.js';
import Marble from './marbles/Marble.js';
import Timer from './Timer.js';

export const resources = new Resources();
export const disasters = [];
export let selectedMarble = null;
export let timer = new Timer(10);

export function initState() {
  initResources(resources, 10, 3);
  disasters.push(...initDisasters());
}

export function removeSelectedMarble() {
  if (selectedMarble !== null) {
    selectedMarble.deselect();
    selectedMarble = null;
  }
}

export function selectMarble(marble) {
  assertInheritance(marble, Marble);

  if (selectedMarble !== null) {
    selectedMarble.deselect();
  }
  marble.select();
  selectedMarble = marble;
}

export function nextRound() {
  timer.nextRound();
  this.removeSelectedMarble();
  disasters.forEach(disaster => {
    if (disaster.isAverted()) {
      disaster.end();
    }
  });
  resources.readyRandomMarbles(3);
}
