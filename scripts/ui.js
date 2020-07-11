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
      const text = document.createTextNode('Possible Solution: ' + solution.description);
      paragraph.append(text);

      const div = document.createElement('div');
      div.classList.add('tasks');

      solution.task.list.forEach(task => {
        assertSubclass(task.type, Marble);

        const img = document.createElement('img');
        const marble = new task.type();
        img.src = `/assets/icons/${marble.icon}.svg`;
        if (task.empty === true) {
          img.classList.add('empty');

          const selectedMarble = GameState.getSelectedMarble();
          if (selectedMarble !== null && selectedMarble instanceof task.type) {
            img.classList.add('possibleDrop');
            img.addEventListener('click', () => {
              solution.addSelectedMarble();
              GameState.getRessources().useMarble(selectedMarble.id);
              GameState.getRessources().readyMarble();
              updateUi();
            });
          }
        }

        div.append(img);

      });
      node.append(paragraph);
      node.append(div);
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
};
