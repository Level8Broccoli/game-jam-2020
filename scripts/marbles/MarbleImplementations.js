import Marble from './Marble.js';

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};

export class MarbleA extends Marble {
  constructor(id = randomId(), name = 'Ninja', icon = 'ninja-star') {
    super(id, name, icon);
  }
}

export class MarbleB extends Marble {
  constructor(id = randomId(), name = 'Shell', icon = 'nautilus-shell') {
    super(id, name, icon);
  }
}

export class MarbleC extends Marble {
  constructor(id = randomId(), name = 'Cristal', icon = 'minerals') {
    super(id, name, icon);
  }
}
