export default class Logger {
  static log(...args) {
    console.trace(...args);
    const pre = document.createElement('pre');
    const text = document.createTextNode(...args);
    pre.append(text);
    document.querySelector('.log').append(pre);
  }
}
