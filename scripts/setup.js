import Action from './Action.js';
import Logger from './Logger.js';

export const initResources = (res, n) => {
  Logger.log('filled bag randomly', n);
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
  while (n > 0) {
    const randomIndex = Math.floor(Math.random() * random.length);
    const randomObj = random[randomIndex];
    const action = new Action(n--, randomObj.name, randomObj.file, res);
    res.upcoming.push(action);
  }
};
