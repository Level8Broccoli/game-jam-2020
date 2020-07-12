import Resources from './Resources.js';
import {
  initResources,
  initDisasters
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
export let selectedMarble = null;
export const timer = new Timer(10);
const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export async function initState() {
  initResources(resources, 10, 3);
  const response = await initDisasters();
  disasters.push(...response);
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
