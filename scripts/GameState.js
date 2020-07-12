import Resources from './Resources.js';
import {
  initResources,
  loadDisasters,
  loadHotspots
} from './helpers/setup.js';
import {
  assertInheritance,
  assertMethod
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';
import Timer from './Timer.js';
import Logger from './helpers/Logger.js';

export const resources = new Resources();
export const disasters = [];
export const hotspots = [];
export let selectedMarble = null;
export const timer = new Timer(10);
const level = 'World';
const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export async function initState() {
  initResources(resources, 10, 3);
  disasters.push(...(await loadDisasters()));
  hotspots.push(...(await loadHotspots(level)));
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

export const hasGameEnded = () => {
  return timer.roundsLeft <= 0;
};

export function nextRound() {
  observerList.forEach(obj => {
    obj.nextRound(timer.getRoundNumber());
  });

  removeSelectedMarble();
  resources.readyRandomMarbles(3);
  if (hasGameEnded()) {
    Logger.log('Game End, Mama is back!');
  }
}
