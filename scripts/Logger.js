export default class Logger {
  static log(...args) {
    console.log(...args);
    const pre = document.createElement('pre');
    const text = document.createTextNode(args.join(' '));
    pre.append(text);
    document.querySelector('.log').append(pre);
  }
}
