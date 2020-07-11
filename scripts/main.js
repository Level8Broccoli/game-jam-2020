import {
  updateUi
} from './ui.js';
import Solution from './Solution.js';
import Task from './Task.js';
import GameChanger from './GameChanger.js';
import Disaster from './Disaster.js';
import GameState from './GameState.js';
import MarbleA from './marbles/MarbleA.js';

GameState.initState();

const solutions = [];
const solution = new Solution('Douse the fire', new Task([{count: 2, type: MarbleA}]), new GameChanger());
solutions.push(solution);
const disasters = [];
const disaster = new Disaster('Paris is buring', solutions, 3, new GameChanger());
disasters.push(disaster);

GameState.addDisasters(...disasters);

updateUi();
