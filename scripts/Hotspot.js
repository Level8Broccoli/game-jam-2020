import { assertType } from './helpers/asserts.js';

export default class Hotspot {
  constructor(name, position) {
    assertType(name, String);
    assertType(position, Array);
    assertType(position[0], Number);
    assertType(position[1], Number);

    this.name = name;
    this.position = position;
  }
}
