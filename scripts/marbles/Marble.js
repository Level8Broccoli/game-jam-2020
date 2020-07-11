import { updateUi } from '../ui.js';
import { assertType } from '../asserts.js';
import GameState from '../GameState.js';

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
        this.isSelected = !this.isSelected;
        updateUi();
      }
    };
  }

  getState() {
    const res = GameState.getRessources();
    return res.getState(this.id);
  }
}
