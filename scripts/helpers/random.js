import {
  assertType
} from './asserts.js';

export function randomIndexOf(arr) {
  assertType(arr, Array);
  if (arr.lenght === 0) return;
  return Math.floor(Math.random() * arr.length);
}
