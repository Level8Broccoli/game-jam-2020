import {
  updateUi
} from '../ui.js';
import {
  assertType
} from '../asserts.js';
import * as GameState from '../GameState.js';

export default class Marble {
  constructor(id, name, icon) {
    assertType(id, Number);
    assertType(name, String);
    assertType(icon, String);

    this.id = id;
    this.name = name;
    this.icon = icon;
    this.isSelected = false;

    this.event = () => {
      if (this.getState() === 'ready') {
        GameState.selectMarble(this);
        updateUi();
      }
    };
  }

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }

  use() {
    GameState.resources.moveFromReadyToInUse(this.id);
  }

  remove() {
    GameState.resources.moveFromInUseToUsed(this.id);
  }

  getState() {
    return GameState.resources.getState(this.id);
  }
}
