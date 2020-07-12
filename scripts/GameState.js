import Resources from './Resources.js';
import {
  initResources,
  loadDisasters,
  loadRegion
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
import PopulationCounter from './PopulationCounter.js';

export const resources = new Resources();
export const disasters = [];
export const hotspots = [];
export const activeGameEvents = [];
export let selectedMarble = null;
export const timer = new Timer(10);
export const population = new PopulationCounter();
export let image = 'world.jpg';

export let end = false;
export let reasonForEnding = 'There seems to be a mistake in the Code :-(';

export let currentLevel;
const observerList = [];

export function subscribeToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  observerList.push(obj);
}

export function removeSubscriptionToGameRound(obj) {
  assertMethod(obj, 'nextRound');
  const index = observerList.indexOf(obj);
  observerList.splice(index, 1);
}

export async function initState(level = 'World') {
  currentLevel = level;
  Logger.log(`Current Map: ${level}`);
  initResources(resources, 12, 3);
  disasters.push(...(await loadDisasters()));
  const world = await loadRegion(level);
  image = world.image;
  hotspots.push(...world.hotspots);
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

export const checkForGameEnd = () => {
  if (timer.roundsLeft <= 0) {
    end = true;
    reasonForEnding = 'Mama is back';
  } else if (population.population <= 0) {
    end = true;
    reasonForEnding = 'Everyone is dead';
  }
};

function cleanUpObserverList() {
  const doneEvents = observerList.filter(e => e.done);
  doneEvents.forEach(event => {
    const index = observerList.indexOf(event);
    observerList.splice(index, 1);
  });
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

export function nextRound() {
  console.log(timer.getRoundNumber());
  observerList.forEach(obj => {
    obj.nextRound(timer.getRoundNumber());
  });

  population.nextRound();
  cleanUpObserverList();
  removeSelectedMarble();
  resources.readyRandomMarbles(3);
  createNewGameEvents();

  checkForGameEnd();
}
