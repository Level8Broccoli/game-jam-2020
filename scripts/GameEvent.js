import {
  assertType
} from './helpers/asserts.js';
import Hotspot from './Hotspot.js';
import Disaster from './Disaster.js';
import * as GameState from './GameState.js';
import {
  randomIndexOf
} from './helpers/random.js';

function calculateActiveEvents() {
  return GameState.activeGameEvents.length;
}

function calculateOpenTasks() {
  return GameState.activeGameEvents.reduce((acc, gameEvent) => acc + gameEvent.numberOfOpenTasks(), 0);
}

function getHotspotNamesNotInUse() {
  const activeHotspotNames = GameState.activeGameEvents.map(gameEvent => gameEvent.hotspot.name);
  return GameState.hotspots
    .filter(hotspot => !activeHotspotNames.includes(hotspot.name))
    .map(hotspot => hotspot.name);
}

export function createNewGameEvents() {
  const numberOfActiveEvents = calculateActiveEvents();
  const numberOfOpenTasks = calculateOpenTasks();

  if (numberOfActiveEvents > 2 ||
    numberOfOpenTasks > 10) {
    return;
  }

  const numberOfNewGameEvents = numberOfActiveEvents === 2 ? 1 : 2;
  const maxNumberOfNewSolutions = Math.ceil((15 - numberOfOpenTasks) / 3);
  createNewRandomGameEvents(numberOfNewGameEvents, maxNumberOfNewSolutions);
}

function createNewRandomGameEvents(maxNewEvents, maxSolutions) {
  if (maxNewEvents <= 0 || maxSolutions <= 0) return;
  const possibleHotspotNames = getHotspotNamesNotInUse();
  if (possibleHotspotNames.length === 0) return;
  const numberOfSolutions = Math.min(Math.floor(Math.random() * maxSolutions), 3);
  const lengthOfCountdown = numberOfSolutions === 1 ? Math.ceil(Math.random() * 2) : Math.min(Math.ceil(Math.random() * 4), 2);

  const newEvent = GameEvent.build(randomHotspot(possibleHotspotNames), randomDisaster(), numberOfSolutions, lengthOfCountdown);
  GameState.activeGameEvents.push(newEvent);

  createNewRandomGameEvents(--maxNewEvents, maxSolutions - numberOfSolutions);
}

function randomHotspot(possibleHotspotNames) {
  assertType(possibleHotspotNames, Array);
  const hotspotsFiltered = GameState.hotspots.filter(hotspot => possibleHotspotNames.includes(hotspot.name));
  let randomIndex = randomIndexOf(hotspotsFiltered);
  return hotspotsFiltered[randomIndex];
}

function randomDisaster() {
  const randomIndex = randomIndexOf(GameState.disasters);
  return GameState.disasters[randomIndex];
}

export default class GameEvent {
  constructor(hotspot, disaster, countdown = 3) {
    assertType(hotspot, Hotspot);
    assertType(disaster, Disaster);
    assertType(countdown, Number);

    this.countdown = countdown;
    this.hotspot = hotspot;
    this.disaster = disaster;
    this.new = true;

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

  numberOfOpenTasks() {
    return this.disaster.numberOfOpenTasks();
  }

  end() {
    this.disaster.removeMarbles();
    GameState.removeGameEvent(this);
  }

  nextRound() {
    this.countdown--;
    this.new = false;
    if (this.countdown === 0 || this.atLeastOneTaskIsCompleted()) {
      this.end();
    }
    this.disaster.freezeMarbles();
  }
}