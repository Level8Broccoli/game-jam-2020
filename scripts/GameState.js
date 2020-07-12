import Resources from './Resources.js';
import {
  initResources,
  loadDisasters,
  loadHotspots
} from './helpers/setup.js';
import {
  assertInheritance,
  assertMethod,
  assertType
} from './helpers/asserts.js';
import Marble from './marbles/Marble.js';
import Timer from './Timer.js';
import Logger from './helpers/Logger.js';
import GameEvent from './GameEvent.js';
import {
  randomIndexOf
} from './helpers/random.js';
import {
  createNewGameEvents
} from './GameEvent.js';

export const resources = new Resources();
export const disasters = [];
export const hotspots = [];
export const activeGameEvents = [];
export let selectedMarble = null;
export const timer = new Timer(10);

export let currentLevel;
const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export async function initState(level = 'World') {
  currentLevel = level;
  Logger.log(`Current Map: ${level}`);
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

  createNewGameEvents();

  if (hasGameEnded()) {
    Logger.log('Game End, Mama is back!');
  }
}

function loadRandomHotspot() {
  const randomIndex = randomIndexOf(hotspots);
  return hotspots[randomIndex];
}

function loadRandomDisaster() {
  const randomIndex = randomIndexOf(disasters);
  return disasters[randomIndex];
}

function loadRandomEvents(eventCount, solutionCount) {
  const events = [];
  for (let i = 0; i < eventCount; i++) {
    events.push(
      GameEvent.build(loadRandomHotspot(), loadRandomDisaster(), solutionCount)
    );
  }
  activeGameEvents.push(...events);
}

export function startGame() {
  loadRandomEvents(1, 1);
}

export function removeGameEvent(gameEvent) {
  assertType(gameEvent, GameEvent);

  const index = this.activeGameEvents.map(e => e === gameEvent).indexOf(true);
  if (index >= 0) {
    this.activeGameEvents.splice(index, 1);
  }
}
