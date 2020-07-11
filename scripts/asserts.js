export function assertType(variable, type) {
  if ((variable === undefined) || (variable === null) || (variable.constructor !== type)) {
    throw new TypeError('Invalid Type "' + variable + '" != ' + type);
  }
}
