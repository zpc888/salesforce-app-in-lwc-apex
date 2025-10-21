/** @module pkg-common/core/functions */

/**
 * check the value is empty
 * @param {*} v - value
 * @returns {boolean} - true if null, undefined, empty string, empty array, or empty object
 * @example
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty('abc') // false
 * isEmpty([1, 2, 3]) // false
 * isEmpty({ a: 1 }) // false
 * isEmpty(0) // false
 * isEmpty(false) // false
 * isEmpty(new Date()) // false
 */
export function isEmpty(v) {
  if (v == null) return true; // null or undefined
  if (typeof v === "string" || Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") {
    if (v instanceof Date) return false;
    if (v instanceof Map || v instanceof Set) return v.size === 0;
    return Object.keys(v).length === 0;
  }
  return false;
}

export function isNotEmpty(v) {
  return !isEmpty(v);
}

export function firstNotEmpty(...args) {
  for (const arg of args) {
    if (!isEmpty(arg)) {
      return arg;
    }
  }
  return null;
}

export function isTrue(v) {
  return v === true || v === "true";
}

export function isFalse(v) {
  return !isTrue(v);
}

export function deepMerge(target, source) {
  const ret = { ...target };
  for (const key in source) {
    if (key in target) {
      if (target[key] instanceof Object && source[key] instanceof Object) {
        ret[key] = deepMerge(target[key], source[key]);
      }
    } else {
      ret[key] = source[key];
    }
  }
  return ret;
}

export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function extractErrorMessage(error) {
  if (isEmpty(error)) {
    return "";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error.body && error.body.message) {
    return error.body.message;
  }
  if (error.message) {
    return error.message;
  }
  if (error.statusText) {
    return error.statusText;
  }
  if (error.status) {
    return error.status;
  }
  if (error.name) {
    return error.name;
  }
  return JSON.stringify(error);
}

export function toNum(c) {
  if (isEmpty(c)) {
    return 0;
  }
  if (isNaN(c)) {
    return 0;
  }
  if (typeof c === "number") {
    return c;
  }
  if (typeof c === "string") {
    const n = Number(c);
    if (!isNaN(n)) {
      return n;
    }
  }
  return 0;
}

export function moveArrayItem(arr, fromIndex, toIndex) {
  if (
    !Array.isArray(arr) ||
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length ||
    fromIndex === toIndex
  ) {
    return arr;
  }
  const newArr = [...arr];
  const item = newArr.splice(fromIndex, 1)[0];
  newArr.splice(toIndex, 0, item);
  return newArr;
}

class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  with(...mixins) {
    return mixins.reduce((acc, mixin) => mixin(acc), this.superclass);
  }
}

export const mix = (superclass) => new MixinBuilder(superclass);
