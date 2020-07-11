import {
  assertType,
  assertSubclass,
  assertInheritance
} from './asserts.js';
import GameState from './GameState.js';
import Marble from './marbles/Marble.js';
import Disaster from './Disaster.js';
import Solution from './Solution.js';

const upcomingNode = document.querySelector('.upcoming');
const readyNode = document.querySelector('.ready');
const usedNode = document.querySelector('.used');
const disastersNode = document.querySelector('.disasters');


const updateMarbles = (node, marbles) => {
  assertType(node, HTMLDivElement);
  assertType(marbles, Array);

  node.textContent = '';
  marbles.forEach(marble => {
    assertInheritance(marble, Marble);

    const img = document.createElement('img');
    img.src = `/assets/icons/${marble.icon}.svg`;
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
    picture.addEventListener('click', marble.event);
    node.append(picture);
  });
};

const updateDisasters = (node, disasters) => {
  assertType(node, HTMLDivElement);
  assertType(disasters, Array);

  node.textContent = '';
  disasters.forEach(disaster => {
    assertType(disaster, Disaster);

    const heading = document.createElement('h4');
    const text = document.createTextNode(disaster.description);
    heading.append(text);

    node.append(heading);

    disaster.solutions.forEach(solution => {
      assertType(solution, Solution);

      const paragraph = document.createElement('p');
      const text = document.createTextNode(solution.description);
      paragraph.append(text);

      solution.task.taskList.forEach(task => {
        assertType(task.count, Number);
        assertSubclass(task.type, Marble);
      });

      node.append(paragraph);
    });
  });
};


export const updateUi = () => {
  const res = GameState.getRessources();
  const disasters = GameState.getDisasters();
  updateMarbles(upcomingNode, res.upcoming);
  updateMarbles(readyNode, res.ready);
  updateMarbles(usedNode, res.used);
  updateDisasters(disastersNode, disasters);
  console.log(GameState.getState());
};
