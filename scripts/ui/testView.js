import {
  assertType,
  assertSubclass,
  assertInheritance
} from '../helpers/asserts.js';
import * as GameState from '../GameState.js';
import Marble from '../marbles/Marble.js';
import Solution from '../Solution.js';
import Timer from '../Timer.js';
import GameEvent from '../GameEvent.js';

const iconFolder = '/assets/icons/';

const renderSolution = (node, solution) => {
  const paragraph = document.createElement('p');
  const text = document.createTextNode(solution.description);
  paragraph.append(text);
  const div = document.createElement('div');
  div.classList.add('tasks');
  solution.tasks.forEach(task => {
    assertSubclass(task.type, Marble);
    div.append(renderTask(task));
  });
  node.append(paragraph);
  node.append(div);
};

const renderGameEvent = (node, gameEvent) => {
  const heading = document.createElement('h4');
  const text = document.createTextNode(`${gameEvent.disaster.title}`);
  heading.append(text);
  node.append(heading);
  gameEvent.disaster.solutions.forEach(solution => {
    assertType(solution, Solution);
    renderSolution(node, solution);
  });
};

const checkIfSlotIsValid = (task, img) => {
  if (GameState.selectedMarble !== null && GameState.selectedMarble instanceof task.type) {
    img.classList.add('possibleDrop');
    img.addEventListener('click', () => {
      GameState.selectedMarble.useIn(task);
      GameState.removeSelectedMarble();
      updateUi();
    });
  }
};

const renderEmptyTaskSlot = (img, task) => {
  img.classList.add('empty');
  checkIfSlotIsValid(task, img);
};

const renderFilledTaskSlot = (img, task) => {
  img.setAttribute('data-id', task.marble.id);
  if (task.frozen) {
    img.classList.add('frozen');
    return;
  }
  img.addEventListener('click', () => {
    GameState.selectMarble(task.marble);
    updateUi();
  });
  if (task.marble.isSelected) {
    img.classList.add('selected');
  }
};

const renderTask = (task) => {
  const marble = task.marble ? task.marble : new task.type();
  const img = document.createElement('img');
  img.src = `${iconFolder}${marble.icon}.svg`;

  if (task.empty === true) {
    renderEmptyTaskSlot(img, task);
  } else {
    renderFilledTaskSlot(img, task);
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

const updateGameEvents = (node, gameEvents) => {
  assertType(node, HTMLDivElement);
  assertType(gameEvents, Array);
  node.textContent = '';

  gameEvents.forEach(gameEvent => {
    assertType(gameEvent, GameEvent);
    renderGameEvent(node, gameEvent);
  });
};

const updateTimer = (node, timer) => {
  assertType(node, HTMLDivElement);
  assertType(timer, Timer);

  node.textContent = '';
  if (GameState.hasGameEnded()) {
    return;
  }

  const paragraph = document.createElement('p');
  const lastRound = timer.roundsLeft === 1;
  const text = document.createTextNode(lastRound ? 'Last Round' : `${timer.roundsLeft} Rounds left`);
  paragraph.append(text);
  node.append(paragraph);
  const button = document.createElement('button');
  const label = document.createTextNode(lastRound ? 'End Game' : 'Next Round');
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
  updateGameEvents(disastersNode, GameState.activeGameEvents);
  updateTimer(timerNode, GameState.timer);
};
