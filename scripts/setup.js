import Action from './Action.js';
import Logger from './Logger.js';

export const initResources = (res, n) => {
  Logger.log('filled bag randomly', n);
  let icons = ['forward-sun', 'minerals', 'nautilus-shell', 'ninja-star', 'ore', 'dragon-head'];
  while (n > 0) {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const action = new Action(n, `Action ${n--}`, icons[randomIndex], res);
    res.upcoming.push(action);
  }
};
