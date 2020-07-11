const upcoming = document.querySelector('.upcoming');
const ready = document.querySelector('.ready');
const used = document.querySelector('.used');


const updateSection = (sec, actions) => {
  sec.textContent = '';
  actions.forEach(action => {
    const img = document.createElement('img');
    img.src = `/assets/icons/${action.icon}.svg`;
    img.alt = action.name;
    const paragraph = document.createElement('p');
    const label = document.createTextNode(action.name);
    paragraph.append(label);
    const picture = document.createElement('picture');
    picture.classList.add('action');
    picture.append(img);
    picture.append(paragraph);
    picture.addEventListener('click', action.event);
    sec.append(picture);
  });
};

export const updateUi = (res) => {
  updateSection(upcoming, res.upcoming);
  updateSection(ready, res.ready);
  updateSection(used, res.used);
};
