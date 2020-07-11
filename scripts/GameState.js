import Resources from './Resources.js';
import {
  initResources
} from './setup.js';
import {
  assertInheritance
} from './asserts.js';
import Marble from './marbles/Marble.js';

let resources = null;
let disasters = null;
let selectedMarble = null;

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
      selectedMarble
    };
  }

  static initState() {
    const state = this.getState();
    initResources(state.resources, 10, 3);
  }

  static getDisasters() {
    const state = this.getState();
    return state.disasters;
  }

  static getSelectedMarble() {
    return selectedMarble;
  }

  static removeSelectedMarble() {
    selectedMarble.deselect();
    selectedMarble = null;
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
}
