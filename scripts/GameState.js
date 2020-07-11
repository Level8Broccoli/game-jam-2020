import Resources from './Resources.js';
import {
  initResources,
  initDisasters
} from './helpers/setup.js';
import {
  assertInheritance, assertMethod
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';
import Timer from './Timer.js';

export const resources = new Resources();
export const disasters = [];
export let selectedMarble = null;
export const timer = new Timer(10);
const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export function initState() {
  initResources(resources, 10, 3);
  disasters.push(...initDisasters());
  subscribeToGameRound(timer);
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
  observerList.forEach(obj =>{
    obj.nextRound();
  });

  removeSelectedMarble();
  resources.readyRandomMarbles(3);
}
