import Bag from './Bag.js';
import Action from './Action.js';
import Hand from './Hand.js';

const log = (...args) => {
  console.log(...args);
  const pre = document.createElement('pre');
  const text = document.createTextNode(...args);
  pre.append(text);
  document.querySelector('.log').append(pre);
};

const fillBagRandomly = (bag) => {
  log('filled bag randomly');
  let icons = ['forward-sun', 'minerals', 'nautilus-shell', 'ninja-star', 'ore', 'dragon-head'];
  let counter = 15;
  while (counter > 0) {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const action = new Action(counter, `Action ${counter--}`, icons[randomIndex]);
    bag.add(action);
  }
};

const pullFromBag = (n = 1) => {
  log(`pulled from bag ${n} times:`);
  while (n > 0 && !bag.isEmpty()) {
    const pulled = bag.pull();
    hand.add(pulled);
    log(`- ${pulled.name}`);
    n--;
  }
};

const drawAction = (action, container, className, listener) => {
  const img = document.createElement('img');
  img.src = `/assets/icons/${action.icon}.svg`;
  img.alt = action.name;
  img.classList.add(className);
  const paragraph = document.createElement('p');
  const label = document.createTextNode(action.name);
  paragraph.append(label);
  const picture = document.createElement('picture');
  picture.classList.add('action');
  picture.append(img);
  picture.append(paragraph);
  if (listener) {
    picture.addEventListener('click', () => {
      hand.removeById(action.id);
      log(`used action: \n- ${action.name}`);
      pullFromBag();
      updateUi();
    });
  }
  container.append(picture);
};

const updateUi = () => {
  const bagContents = document.querySelector('.bagContents');
  bagContents.innerHTML = '';

  bag.contents.forEach(action => {
    drawAction(action, bagContents, 'inside');
  });

  const pulledContents = document.querySelector('.pulledContents');
  pulledContents.innerHTML = '';

  hand.contents.forEach(action => {
    drawAction(action, pulledContents, 'outside', true);
  });
};

const bag = new Bag();
const hand = new Hand();
fillBagRandomly(bag);
pullFromBag(3);
updateUi();
