export function assertType(variable, type) {
  if ((variable === undefined) || (variable === null) || (variable.constructor !== type)) {
    throw new TypeError('Invalid Type "' + variable + '" != ' + type);
  }
}

export function assertInheritance(obj, clazz) {
  if ((obj === undefined) || (obj === null) || !(clazz.isPrototypeOf(obj.constructor))) {
    throw new TypeError('Invalid Type "' + obj + '" is not an instance of ' + clazz);
  }
}

export function assertSubclass(subclass, clazz) {
  if ((subclass === undefined) || (subclass === null) || !(clazz.isPrototypeOf(subclass))) {
    throw new TypeError('Invalid Type "' + subclass + '" is not a subclass of ' + clazz);
  }
}
