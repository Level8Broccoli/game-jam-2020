import { updateUi } from './ui.js';

export default class Action {
  constructor(id, name, icon, res) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.res = res;
    this.event = () => {
      if (this.getState() === 'ready') {
        this.res.useAction(this.id);
        this.res.readyAction();
        updateUi(this.res);
      }
    };
  }

  getState() {
    return this.res.getState(this.id);
  }
}
