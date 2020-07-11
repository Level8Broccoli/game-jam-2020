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

let resources = null;
let disasters = null;
let selectedMarble = null;
let timer = new Timer(10);

export default class GameState {
  static getState() {
    if (resources === null) {
      resources = new Resources();
    }
    if (disasters === null) {
      disasters = [];
    }

    return {
      resources,
      disasters,
      selectedMarble,
      timer
    };
  }

  static initState() {
    const state = this.getState();
    initResources(state.resources, 10, 3);
    const disasters = initDisasters();
    this.addDisasters(...disasters);
  }

  static getDisasters() {
    const state = this.getState();
    return state.disasters;
  }

  static getSelectedMarble() {
    return selectedMarble;
  }

  static getTimer() {
    return timer;
  }

  static removeSelectedMarble() {
    if (selectedMarble !== null) {
      selectedMarble.deselect();
      selectedMarble = null;
    }
  }

  static selectMarble(marble) {
    assertInheritance(marble, Marble);

    if (selectedMarble !== null) {
      selectedMarble.deselect();
    }
    marble.select();
    selectedMarble = marble;
  }

  static getRessources() {
    const state = this.getState();
    return state.resources;
  }

  static addDisasters(...disasters) {
    const state = this.getState();
    state.disasters.push(...disasters);
  }

  static nextRound() {
    timer.nextRound();
    this.removeSelectedMarble();
  }
}
