import Marble from './Marble.js';

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};

export class MarbleA extends Marble {
  constructor(id = randomId(), name = 'Fear', icon = 'triple-skulls') {
    super(id, name, icon);
  }
}

export class MarbleB extends Marble {
  constructor(id = randomId(), name = 'Nature', icon = 'plants-and-animals') {
    super(id, name, icon);
  }
}

export class MarbleC extends Marble {
  constructor(id = randomId(), name = 'Empathy', icon = 'overdose') {
    super(id, name, icon);
  }
}

export class MarbleD extends Marble {
  constructor(id = randomId(), name = 'Joker', icon = 'sun') {
    super(id, name, icon);
  }
}
