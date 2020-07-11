import { updateUi } from './ui.js';

export default class Marble {
  constructor(id, name, icon, res) {
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
