import {
  updateUi
} from './ui.js';
import Solution from './Solution.js';
import Task from './Task.js';
import GameChanger from './GameChanger.js';
import Disaster from './Disaster.js';
import GameState from './GameState.js';

GameState.initState();

const solutions = [];
const solution = new Solution('Douse the fire', new Task(), new GameChanger());
solutions.push(solution);
const disasters = [];
const disaster = new Disaster('desc', solutions, 3, new GameChanger());
disasters.push(disaster);

updateUi();
