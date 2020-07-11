import Logger from './Logger.js';
import {
  MarbleA,
  MarbleB,
  MarbleC
} from './marbles/MarbleImplementations.js';
import Solution from './Solution.js';
import Task from './Task.js';
import GameChanger from './GameChanger.js';
import Disaster from './Disaster.js';
import GameState from './GameState.js';

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

export const initDisasters = () => {
  const solutions = [];
  const solution1 = new Solution('Douse the fire', new Task([{
    count: 2,
    type: MarbleA
  }]), new GameChanger());
  solutions.push(solution1);
  const solution2 = new Solution('Remove Air', new Task([{
    count: 1,
    type: MarbleB
  }, {
    count: 2,
    type: MarbleC
  }]), new GameChanger());
  solutions.push(solution2);
  const disasters = [];
  const disaster = new Disaster('Paris is buring', solutions, 3, new GameChanger());
  disasters.push(disaster);

  return disasters;
};
