import Resources from './Resources.js';
import {
  initResources
} from './setup.js';

let resources = null;
let disasters = null;

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
      disasters
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

  static getRessources() {
    const state = this.getState();
    return state.resources;
  }
  static addDisasters(...disasters) {
    const state = this.getState();
    state.disasters.push(...disasters);
  }
}
