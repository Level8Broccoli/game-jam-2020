import GameState from './GameState.js';

const upcoming = document.querySelector('.upcoming');
const ready = document.querySelector('.ready');
const used = document.querySelector('.used');


const updateSection = (sec, marbles) => {
  sec.textContent = '';
  marbles.forEach(marble => {
    const img = document.createElement('img');
    img.src = `/assets/icons/${marble.icon}.svg`;
    img.alt = marble.name;
    const paragraph = document.createElement('p');
    const label = document.createTextNode(marble.name);
    paragraph.append(label);
    const picture = document.createElement('picture');
    picture.classList.add('marble');
    picture.append(img);
    picture.append(paragraph);
    picture.addEventListener('click', marble.event);
    sec.append(picture);
  });
};

export const updateUi = () => {
  const state = GameState.getState();
  const res = state.resources;
  updateSection(upcoming, res.upcoming);
  updateSection(ready, res.ready);
  updateSection(used, res.used);
};
