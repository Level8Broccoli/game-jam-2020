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
import GameEvent from './GameEvent.js';

export const resources = new Resources();
export const disasters = [];
export const hotspots = [];
export const activeGameEvents = [];
export let selectedMarble = null;
export const timer = new Timer(10);

const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export async function initState(level = 'World') {
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

function loadRandomHotspot() {
  const randomIndex = Math.floor(Math.random() * hotspots.length);
  return hotspots[randomIndex];
}

function loadRandomDisaster() {
  const randomIndex = Math.floor(Math.random() * disasters.length);
  return disasters[randomIndex];
}

function loadRandomEvents(n) {
  const events = [];
  for (let i = 0; i < n; i++) {
    events.push(
      new GameEvent(
        loadRandomHotspot(), loadRandomDisaster()
      )
    );
  }
  activeGameEvents.push(...events);
}

export function startGame() {
  loadRandomEvents(1);
}
