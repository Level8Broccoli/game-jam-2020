import Resources from './Resources.js';
import { initResources } from './setup.js';
import { updateUi } from './ui.js';


const res = new Resources();
initResources(res, 10);
res.readyAction();
res.readyAction();
res.readyAction();
updateUi(res);
console.log(res);
