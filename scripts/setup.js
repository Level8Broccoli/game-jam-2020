import Marble from './Marble.js';
import Logger from './Logger.js';

export const initResources = (res, marbleCount, readyCount) => {
  Logger.log('filled bag randomly', marbleCount, 'starting with', readyCount);
  let random = [{
    name: 'Push',
    file: 'forward-sun'
  }, {
    name: 'Cristal',
    file: 'minerals'
  }, {
    name: 'Shell',
    file: 'nautilus-shell'
  }, {
    name: 'Ninjas',
    file: 'ninja-star'
  }, {
    name: 'Stone',
    file: 'ore'
  }, {
    name: 'Dragon',
    file: 'dragon-head'
  }];
  while (marbleCount > 0) {
    const randomIndex = Math.floor(Math.random() * random.length);
    const randomObj = random[randomIndex];
    const marble = new Marble(marbleCount--, randomObj.name, randomObj.file, res);
    res.upcoming.push(marble);
  }
  while (readyCount > 0) {
    res.readyMarble();
    readyCount--;
  }
};
