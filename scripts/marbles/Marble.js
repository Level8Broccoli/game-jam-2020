import {
  assertType
} from '../helpers/asserts.js';
import * as GameState from '../GameState.js';
import Task from '../Task.js';

export default class Marble {
  constructor(id, name, icon) {
    assertType(id, Number);
    assertType(name, String);
    assertType(icon, String);

    this.id = id;
    this.name = name;
    this.icon = icon;
    this.placedInTask = null;
    this.isSelected = false;

    this.event = () => {
      if (this.getState() === 'ready') {
        GameState.selectMarble(this);
      }
    };
  }

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }

  useIn(task) {
    assertType(task, Task);
    const state = this.getState();
    if (state === 'ready') {
      GameState.resources.moveFromReadyToInUse(this.id);
    } else if (state === 'inUse') {
      this.placedInTask.removeMarble(this);
    }
    task.addMarble(this);
    this.placedInTask = task;
  }

  remove() {
    this.placedInTask = null;
    GameState.resources.moveFromInUseToUsed(this.id);
  }

  getState() {
    return GameState.resources.getState(this.id);
  }
}
