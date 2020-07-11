import Resources from './Resources.js';
import {
  initResources
} from './setup.js';
import {
  updateUi
} from './ui.js';
import Solution from './Solution.js';
import Task from './Task.js';
import Reward from './Reward.js';
import Disaster from './Disaster.js';

const res = new Resources();
initResources(res, 10);
res.readyAction();
res.readyAction();
res.readyAction();


const solutions = [];
const solution = new Solution('Douse the fire', new Task(), new Reward());
solutions.push(solution);
const disasters = [];
const disaster = new Disaster('location', 'desc', solutions, 3, 'consequence');
disasters.push(disaster);

updateUi(res, disasters);
