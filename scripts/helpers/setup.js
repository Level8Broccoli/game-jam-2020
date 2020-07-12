import Logger from './Logger.js';
import {
  MarbleA,
  MarbleB,
  MarbleC
} from '../marbles/MarbleImplementations.js';
import Solution from '../Solution.js';
import Disaster from '../Disaster.js';
import Hotspot from '../Hotspot.js';
import Task from '../Task.js';

export const initResources = (res, marbleCount, readyCount) => {
  Logger.log('filled bag randomly', marbleCount, 'starting with', readyCount);
  while (marbleCount > 0) {
    let marble;
    if (marbleCount % 3 === 0) {
      marble = new MarbleA();
    } else if (marbleCount % 3 === 1) {
      marble = new MarbleB();
    } else {
      marble = new MarbleC();
    }
    res.upcoming.push(marble);
    marbleCount--;
  }
  res.readyRandomMarbles(readyCount);
};

export const loadRegion = async (location) => {
  const response = await fetch('/assets/maps/maps.json');
  const region = (await response.json()).find(e => e.name === location);
  const hotspots = region.hotspots.map(h => {
    return new Hotspot(h.name, h.position);
  });
  const image = region.image;
  return {
    image: image,
    hotspots: hotspots
  };
};

export const loadDisasters = async () => {
  const response = await fetch('/assets/disasters.json');
  const disasters = (await response.json());

  return disasters.map(d => {
    return new Disaster(d.title, d.description, d.solutions.map(s => {
      return new Solution(s.title, s.description, s.tasks.map(t => {
        const marbleType = t === 1 ? MarbleA : (t === 2 ? MarbleB : MarbleC);
        return new Task(marbleType);
      }));
    }));
  });
};
