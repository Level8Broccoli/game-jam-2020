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
import PopulationCounter from '../PopulationCounter.js';

const iconFolder = '/assets/icons/';

const renderSolution = (node, solution) => {
  const title = document.createElement('p');
  title.classList.add('solution-title');
  const titleText = document.createTextNode(solution.title);
  title.append(titleText);
  node.append(title);

  const paragraph = document.createElement('p');
  paragraph.classList.add('solution-subtitle');
  const text = document.createTextNode(solution.description);
  paragraph.append(text);
  node.append(paragraph);


  const div = document.createElement('div');
  div.classList.add('tasks');
  solution.tasks.forEach(task => {
    assertSubclass(task.type, Marble);
    div.append(renderTask(task));
  });
  node.append(div);
};

const renderGameEvent = (node, gameEvent) => {
  const heading = document.createElement('h4');
  heading.classList.add('disaster-title');
  const text = document.createTextNode(`${gameEvent.new ? 'NEW: ' : ''}${gameEvent.disaster.title}`);
  if (gameEvent.new) {
    heading.classList.add('new');
  }
  heading.append(text);
  node.append(heading);

  const countdown = document.createElement('p');
  countdown.classList.add('countdown');
  const countdownText = document.createTextNode(`(Rounds left: ${gameEvent.countdown})`);
  if (gameEvent.countdown === 1) {
    countdown.classList.add('warning');
  }

  countdown.append(countdownText);
  node.append(countdown);

  const subheading = document.createElement('h5');
  subheading.classList.add('disaster-subtitle');
  const subheadingText = document.createTextNode(gameEvent.disaster.description);
  subheading.append(subheadingText);
  node.append(subheading);

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

const updateBackground = () => {
  const node = document.querySelector('body');
  node.style.backgroundImage = 'url(\'/assets/maps/' + GameState.image + '\')';
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
  updateBackground();
  node.append(button);
};

function updatePopulation(node, counter) {
  node.textContent = '';

  assertType(counter, PopulationCounter);
  const paragraph = document.createElement('p');
  const text = document.createTextNode(`Population left: ${Math.max(Math.round(counter.population*10000)/10000, 0)} Billions`);
  paragraph.append(text);
  node.append(paragraph);
}

const upcomingNode = document.querySelector('.upcoming');
const readyNode = document.querySelector('.ready');
const usedNode = document.querySelector('.used');
const disastersNode = document.querySelector('.disasters');
const timerNode = document.querySelector('.timer');
const populationNode = document.querySelector('.population');

export const updateUi = () => {
  updateMarbles(upcomingNode, GameState.resources.upcoming);
  updateMarbles(readyNode, GameState.resources.ready);
  updateMarbles(usedNode, GameState.resources.used);
  updateGameEvents(disastersNode, GameState.activeGameEvents);
  updateTimer(timerNode, GameState.timer);
  updatePopulation(populationNode, GameState.population);
};
