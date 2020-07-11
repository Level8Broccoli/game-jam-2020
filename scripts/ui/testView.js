import {
  assertType,
  assertSubclass,
  assertInheritance
} from '../helpers/asserts.js';
import * as GameState from '../GameState.js';
import Marble from '../marbles/Marble.js';
import Disaster from '../Disaster.js';
import Solution from '../Solution.js';
import Timer from '../Timer.js';

const iconFolder = '/assets/icons/';

const renderDisaster = (node, disaster) => {
  const heading = document.createElement('h4');
  const text = document.createTextNode(disaster.description);
  heading.append(text);
  node.append(heading);
  disaster.solutions.forEach(solution => {
    assertType(solution, Solution);
    renderSolution(node, solution);
  });
};

const renderSolution = (node, solution) => {
  const paragraph = document.createElement('p');
  const text = document.createTextNode('Possible Solution: ' + solution.description);
  paragraph.append(text);
  const div = document.createElement('div');
  div.classList.add('tasks');
  solution.task.list.forEach(task => {
    assertSubclass(task.type, Marble);
    div.append(renderTask(task, solution));
  });
  node.append(paragraph);
  node.append(div);
};

const renderTask = (task, solution) => {
  const img = document.createElement('img');
  const marble = new task.type();
  img.src = `${iconFolder}${marble.icon}.svg`;
  if (task.empty === true) {
    img.classList.add('empty');
    if (GameState.selectedMarble !== null && GameState.selectedMarble instanceof task.type) {
      img.classList.add('possibleDrop');
      img.addEventListener('click', () => {
        solution.addSelectedMarble();
        GameState.selectedMarble.useIn(task);
        GameState.removeSelectedMarble();
        updateUi();
      });
    }
  } else {
    img.setAttribute('data-id', task.marble.id);
    img.addEventListener('click', () => {
      GameState.selectMarble(task.marble);
      updateUi();
    });
    if (task.marble.isSelected) {
      img.classList.add('selected');
    }
  }
  return img;
};

const renderMarble = (node, marble) => {
  const img = document.createElement('img');
  img.src = `${iconFolder}${marble.icon}.svg`;
  img.alt = marble.name;
  const paragraph = document.createElement('p');
  const label = document.createTextNode(marble.name);
  paragraph.append(label);
  const picture = document.createElement('picture');
  picture.classList.add('marble');
  if (marble.isSelected) {
    picture.classList.add('selected');
  }
  picture.append(img);
  picture.append(paragraph);
  picture.addEventListener('click', () => {
    marble.event();
    updateUi();
  });
  node.append(picture);
};


const updateMarbles = (node, marbles) => {
  assertType(node, HTMLDivElement);
  assertType(marbles, Array);
  node.textContent = '';
  marbles.forEach(marble => {
    assertInheritance(marble, Marble);
    renderMarble(node, marble);
  });
};

const updateDisasters = (node, disasters) => {
  assertType(node, HTMLDivElement);
  assertType(disasters, Array);
  node.textContent = '';

  disasters.filter(disaster => !disaster.finished).forEach(disaster => {
    assertType(disaster, Disaster);
    renderDisaster(node, disaster);
  });
};

const updateTimer = (node, timer) => {
  assertType(node, HTMLDivElement);
  assertType(timer, Timer);

  node.textContent = '';
  const paragraph = document.createElement('p');
  const roundString = timer.roundsLeft > 1 ? 'Rounds' : 'Round';
  const text = document.createTextNode(`${timer.roundsLeft} ${roundString} left`);
  paragraph.append(text);
  node.append(paragraph);
  const button = document.createElement('button');
  const label = document.createTextNode('Next Round');
  button.append(label);
  button.addEventListener('click', () => {
    GameState.nextRound();
    updateUi();
  });
  node.append(button);
};

const upcomingNode = document.querySelector('.upcoming');
const readyNode = document.querySelector('.ready');
const usedNode = document.querySelector('.used');
const disastersNode = document.querySelector('.disasters');
const timerNode = document.querySelector('.timer');

export const updateUi = () => {
  updateMarbles(upcomingNode, GameState.resources.upcoming);
  updateMarbles(readyNode, GameState.resources.ready);
  updateMarbles(usedNode, GameState.resources.used);
  updateDisasters(disastersNode, GameState.disasters);
  updateTimer(timerNode, GameState.timer);
};
