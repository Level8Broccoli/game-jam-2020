import Logger from './Logger.js';
import {
  MarbleA,
  MarbleB,
  MarbleC
} from './marbles/MarbleImplementations.js';

export const initResources = (res, marbleCount, readyCount) => {
  Logger.log('filled bag randomly', marbleCount, 'starting with', readyCount);
  while (marbleCount > 0) {
    let marble;
    if (marbleCount % 3 === 0) {
      marble = new MarbleA();
    } else if (marbleCount % 3 === 1) {
      marble = new MarbleB();
    } else {
      marble = new MarbleC();
    }
    res.upcoming.push(marble);
    marbleCount--;
  }
  while (readyCount > 0) {
    res.readyMarble();
    readyCount--;
  }
};
