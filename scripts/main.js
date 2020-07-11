import {
  updateUi
} from './ui.js';
import Solution from './Solution.js';
import Task from './Task.js';
import GameChanger from './GameChanger.js';
import Disaster from './Disaster.js';
import GameState from './GameState.js';
import {
  MarbleA,
  MarbleC,
  MarbleB
} from './marbles/MarbleImplementations.js';

GameState.initState();

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

GameState.addDisasters(...disasters);

updateUi();
