import { updateUi } from '../ui.js';
import { assertType } from '../asserts.js';
import Resources from '../Resources.js';

export default class Marble {
  constructor(id, name, icon, res) {
    assertType(id, Number);
    assertType(name, String);
    assertType(icon, String);
    assertType(res, Resources);

    this.id = id;
    this.name = name;
    this.icon = icon;
    this.res = res;
    this.event = () => {
      if (this.getState() === 'ready') {
        this.res.useMarble(this.id);
        this.res.readyMarble();
        updateUi();
      }
    };
  }

  getState() {
    return this.res.getState(this.id);
  }
}
