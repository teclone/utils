import { root, host, Callback, isBrowser, isServiceWorker } from '@teclone/global';

const alphabets = 'abcdefghijklmnopqrstuvwxyz';

const digits = '0123456789';

/**
 * test if argument is a function
 */
export const isCallable = (arg: any): arg is Function => {
  return (
    (toString.call(arg) === '[object Function]' || arg instanceof Function) &&
    !(arg instanceof RegExp)
  );
};

/**
 * to string method
 */
export const toString = Object.prototype.toString;

export interface CallbackCache<C extends Function = Callback, P = any> {
  callback: C;
  parameters?: P | P[];
  scope?: object;
  [propName: string]: any;
}

export const CASE_STYLES = {
  NONE: 0,
  CAMEL_CASE: 1,
  SNAKE_CASE: 2,
};

/**
 * picks the given value from the object, supressing any error that may occur while trying
 * to access key
 *
 * @param key
 * @param object
 */
const getValue = (key: string, object: object) => {
  try {
    const value = object[key];
    return value;
  } catch (ex) {
    return undefined;
  }
};

/**
 * tests if argument is null
 */
export const isNull = (arg: any): arg is null => {
  return arg === null;
};

/**
 * tests if argument is undefined
 */
export const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === 'undefined';
};

/**
 * tests if argument is boolean
 */
export const isBoolean = (arg: any): arg is boolean => {
  return typeof arg === 'boolean';
};

/**
 * tests if argument is a number
 */
export const isNumber = (arg: any): arg is number => {
  return typeof arg === 'number' && !isNaN(arg);
};

/**
 * tests if argument is a string
 */
export const isString = (arg: any): arg is string => {
  return typeof arg === 'string';
};

/**
 * test if argument starts with integer, whether positive or negative
 */
export const isInt = (arg: any): arg is string => {
  return /^[-+]?\d+/.test(arg);
};

/**
 * test if argument starts with number(integer or float), whether positive or negative
 */
export const isNumeric = (arg: any): arg is string => {
  return /^[-+.]?\d+/.test(arg);
};

/**
 * test if argument is an array
 */
export const isArray = <T>(arg: T | T[]): arg is T[] => {
  return toString.call(arg) === '[object Array]' || arg instanceof Array;
};

/**
 * test if argument is a regular expressions
 */
export const isRegex = (arg: any): arg is RegExp => {
  return toString.call(arg) === '[object RegExp]' && arg instanceof RegExp;
};

/**
 * test if argument is a javascript object, but not an array, Regex, function or null
 */
export const isObject = <T = object>(arg: any): arg is T => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    arg !== undefined &&
    !isCallable(arg) &&
    !isArray(arg) &&
    !isRegex(arg)
  );
};

/**
 * test if argument is a plain javascript object
 */
export const isPlainObject = (arg: any): arg is object => {
  if (isObject(arg)) {
    const proto = Object.getPrototypeOf(arg);
    return proto === null || proto === Object.getPrototypeOf({});
  }
  return false;
};

/**
 * test if argument is a valid method parameter. by default, all types are valid parameters
 * except undefined.
 */
export const isParameter = (arg: any, isNullable: boolean = true) => {
  if (typeof arg === 'undefined') {
    return false;
  }

  if (arg === null) {
    return isNullable;
  }

  return true;
};

/**
 * detects if argument is a Document
 */
export const isDocumentNode = (arg: any): arg is Document => {
  return arg?.nodeType === 9;
};

/**
 * detects if argument is an element node
 */
export const isElementNode = (arg: any): arg is Element => {
  return arg?.nodeType === 1;
};

/**
 * puts argument into an array if it is not an array,
 */
export const makeArray = <T>(
  arg: T | T[] | null | undefined,
  isNullable: boolean = false,
): T[] => {
  if (isArray(arg)) {
    return arg;
  }

  return isParameter(arg, isNullable) ? [arg] : [];
};

/**
 * fills an array to the given length with the given value. if no value is given, it fills the array using the last
 * element in the array. if array is in turn empty, it fills with undefined
 * @param arg
 */
export const fillArray = <T>(arg: T[], length: number, value?: T): T[] => {
  const difference = length - arg.length;
  value = value ?? (arg.length > 0 ? arg[arg.length - 1] : undefined);
  if (difference > 0) {
    return [...arg, ...Array(difference).fill(value)];
  } else {
    return [...arg];
  }
};

export function makeObject<T extends object>(arg: T): T;
export function makeObject(arg: any): object;

/**
 * returns argument if it is an object, otherwise returns an empty plain object,
 * an object is a javascript entity whose typeof returns 'object' but it is not a null,
 * function, array or RegExp
 */
export function makeObject<T>(arg: any): T {
  if (isObject<T>(arg)) {
    return arg;
  }

  return {} as T;
}

/**
 * asserts that target is T if the given property is defined in target
 * @param prop property to check
 * @param target the target object
 */
export const isTypeOf = <T extends O, O extends object = any>(
  props: string | string[],
  target: O,
): target is T => {
  return makeArray(props).every((prop) => typeof getValue(prop, target) !== 'undefined');
};

/**
 * returns true if key is not set in the given object or key is set and its value is truthy
 */
export const keyNotSetOrTrue = (key: string, object: object): boolean => {
  return typeof object[key] === 'undefined' || !!object[key];
};

/**
 * returns true if key is set in the given object and its value is truthy
 */
export const keySetAndTrue = (key: string, object: object): boolean => {
  return typeof object[key] !== 'undefined' && !!object[key];
};

/**
 * returns the value for the first key that exists in the object otherwise,
 * it returns the default value
 */
export const pickValue = <T = any>(
  keys: string | string[],
  object: object,
  defaultValue?: T,
): T => {
  keys = makeArray(keys);
  for (const key of keys) {
    const value = getValue(key, object);
    if (typeof value !== 'undefined') {
      return value;
    }
  }
  return defaultValue;
};

/**
 * returns the value for the first key that exists in the object whose value is an array otherwise,
 * it returns the default value
 */
export const pickArray = <T = any>(
  keys: string | string[],
  object: object,
  defaultValue: T[] = [],
): T[] => {
  keys = makeArray(keys);
  for (const key of keys) {
    const value = getValue(key, object);
    if (isArray(value)) {
      return value;
    }
  }
  return defaultValue;
};

/**
 * returns the value for the first key that exists in the object whose value is an object otherwise,
 * it returns the default value
 */
export const pickObject = (
  keys: string | string[],
  object: object,
  defaultValue: object = {},
): object => {
  keys = makeArray(keys);
  for (const key of keys) {
    const value = getValue(key, object);
    if (isObject(value)) {
      return value;
    }
  }
  return defaultValue;
};

/**
 * it deletes given property from the given object if it exists
 * returns true if it succeeds, otherwise returns false
 */
export const deleteProperty = (key: string, target: object): boolean => {
  try {
    return delete target[key];
  } catch (ex) {
    return false;
  }
};

/**
 * it deletes given property from the given object if it exists
 * returns true if all properties where handled accurately, also returns true if any of
 * the properties could not be deleted.
 */
export const deleteProperties = (keys: string[], target: object) => {
  const results = keys.map((key) => deleteProperty(key, target));
  return results.length === 0 || results.every((result) => result);
};

/**
 * scope callback using a cache object
 * @param callbackCache
 */
export function scopeCallback(callbackCache: CallbackCache): (...args) => any;

/**
 * scope callback using the given scope and parameters
 */
export function scopeCallback<T = any>(
  callback: Callback,
  scope?: object,
  parameters?: T | T[],
): (...args) => any;

/**
 * generates a callback function, scoping the execution with optional extra parameters
 */
export function scopeCallback<T = any>(
  callback: Callback | CallbackCache,
  scope: object = null,
  parameters: T | T[] = [],
) {
  if (isObject<CallbackCache>(callback)) {
    return (...args) => {
      parameters = makeArray(callback.parameters);
      scope = pickValue('scope', callback, null);

      try {
        return callback.callback.apply(scope, [...args, ...parameters]);
      } catch (ex) {
        // do nothing
      }
    };
  } else {
    parameters = makeArray(parameters);
    return (...args) => {
      try {
        return callback.apply(scope, [...args, ...(parameters as T[])]);
      } catch (ex) {
        // do nothing
      }
    };
  }
}

/**
 * schedules the execution of a scoped callback to a given time
 */
export const scheduleCallback = (scopedCallback: Callback, time: number = 1000) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(scopedCallback());
    }, time);
  });
};

/**
 * generates a random number between min (inclusive) and max (inclusive)
 * @param min the min value that can be generated
 * @param max the maximum value that can be generated
 */
export const generateRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * generates random digit of given character length
 */
export const generateRandomDigits = (length: number = 4): string => {
  const result: string[] = [];

  while (length--) {
    result.push(digits.charAt(Math.floor(Math.random() * digits.length)));
  }
  return result.join('');
};

/**
 * generates a random text of given character length
 */
export const generateRandomText = (
  length: number = 4,
  exemptNumerals: boolean = false,
): string => {
  const letters = alphabets + alphabets.toUpperCase();

  const chars = exemptNumerals ? letters : letters + digits;
  const result: string[] = [];

  while (length--) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join('');
};

/**
 * creates a range of numerical values
 */
export function range(from: number, to: number, step?: number): number[];

/**
 * creates a range of alphabetic characters
 */
export function range(from: string, to: string, step?: number): string[];

/**
 * creates a range of values
 */
export function range(
  from: string | number,
  to: string | number,
  step: number = 1,
): number[] | string[] {
  const result = [];
  const letters =
    from.toString().toLowerCase() !== from ? alphabets.toUpperCase() : alphabets;
  step = step <= 0 ? 1 : step;

  // resolve start and end points
  let start: number = null;
  let end: number = null;

  if (isString(from)) {
    start = alphabets.indexOf(from.toLowerCase());
    end = alphabets.indexOf((to as string).toLowerCase());

    if (start < 0) {
      start = null;
    }

    if (end < 0) {
      end = letters.length - 1;
    }
  } else {
    start = from;
    end = to as number;
  }

  if (start !== null) {
    // interchange start with end if start is greater than end
    if (start > end) {
      const interchanger = start;
      start = end;
      end = interchanger;
    }

    if (isString(from)) {
      step = step >= 1 ? Math.ceil(step) : 1;
      for (start; start <= end; start += step) {
        result.push(letters[start]);
      }
    } else {
      for (start; start <= end; start += step) {
        result.push(start);
      }
    }
  }

  return result;
}

/**
 * flattens arrays to any deep length
 * @param arr array to flatten
 * @param depth the depth value to enter
 */
export const flatten = <T>(array: T[], depth: number = 1) => {
  if (depth < 1) {
    return Array.prototype.slice.call(array);
  }
  return (function flat(arr: T[]) {
    let result: T[] = [];

    const len = arr.length;
    let i = 0;
    depth = depth - 1;
    while (i < len) {
      const el = arr[i++];
      if (Array.isArray(el)) {
        result = result.concat(depth > 0 ? flat(el) : el);
      } else {
        result.push(el);
      }
    }
    return result;
  })(array);
};

/**
 * copies the objects into the target object, without creating references, unlike Object.assign
 */
export const copy = <T extends object, O extends object>(
  target: T,
  ...objects: O[]
): T &
  {
    [P in keyof O]: O[P];
  } => {
  const cloneEach = (dest: any, value: any) => {
    if (isArray(value)) {
      return value.map((current) => cloneEach(null, current));
    }

    if (isCallable(value) || isRegex(value) || !isObject(value)) {
      return value;
    }

    dest = makeObject(dest);
    for (const [key, current] of Object.entries(value)) {
      dest[key] = cloneEach(dest[key], current);
    }
    return dest;
  };

  objects.forEach((item) => {
    if (isObject(item)) {
      for (const [key, value] of Object.entries(item)) {
        target[key] = cloneEach(target[key], value);
      }
    }
  });

  return target as T & { [P in keyof O]: O[P] };
};

/**
 * converts text to camel like casing
 */
export const camelCase = (
  text: string,
  delimiter: string | RegExp = /[-_\s]/,
): string => {
  return text
    .split(delimiter)
    .map((token, index) => {
      return index === 0 ? token : token.charAt(0).toUpperCase() + token.substring(1);
    })
    .join('');
};

/**
 * converts text to snake like casing
 */
export const snakeCase = (
  text: string,
  delimiter: string | RegExp = /[-_\s]/,
): string => {
  return text
    .split(delimiter)
    .map((token) => token.toLowerCase())
    .join('_');
};

/**
 * applies case based on the case style chosen
 * @param text text to apply case on
 * @param caseStyle case style of choice
 * @param delimiter optional delimiter string or regex
 */
export const applyCase = (
  text: string,
  caseStyle: number,
  delimiter: string | RegExp = /[-_\s]/,
): string => {
  switch (caseStyle) {
    case CASE_STYLES.CAMEL_CASE:
      return camelCase(text, delimiter);

    case CASE_STYLES.SNAKE_CASE:
      return snakeCase(text, delimiter);

    default:
      return text;
  }
};

/**
 * capitalizes the given text
 * @param text text to capitalize
 */
export const capitalize = (text: string): string => {
  return text.length > 0
    ? text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    : '';
};

/**
 * expands the string key and turns it into an object property
 */
export const expandProperty = <T extends object>(
  target: T,
  key: string,
  value: any,
  delimiter: string = '.',
  caseStyle: number = CASE_STYLES.CAMEL_CASE,
): T & { [propName: string]: any } => {
  const keys = key.split(delimiter);
  const lastKey = applyCase(keys.pop(), caseStyle);

  const lastObject: object = keys.reduce((current, key) => {
    key = applyCase(key, caseStyle);
    current[key] = makeObject(current[key]);
    return current[key];
  }, target);

  lastObject[lastKey] = value;

  return target;
};

/**
 * pads the given target text or number with the pad with value until the target length meets
 * the given length
 */
export const padLeft = (
  target: string | number,
  length = 4,
  padWith: string | number = 0,
): string => {
  target = target.toString();
  padWith = padWith.toString();

  let padTimes = length - target.length;
  while (padTimes-- > 0) {
    target = padWith + target;
  }

  return target;
};

/**
 * pads the given target text or number with the pad with value until the target length meets
 * the given length
 */
export const padRight = (
  target: string | number,
  length = 4,
  padWith: string | number = 0,
): string => {
  target = target.toString();
  padWith = padWith.toString();

  let padTimes = length - target.length;
  while (padTimes-- > 0) {
    target += padWith;
  }

  return target;
};

/**
 * encodes the query name and value and returns the result
 * @param name query name
 * @param value query value
 * @param multiValueIdentifier an identifier to be prepended to multivalue query names for
 * identification.
 */
export const encodeDataEntry = (
  name: string,
  value: string | number | (string | number)[],
  multiValueIdentifier: string = '[]',
): string => {
  name = encodeURIComponent(name);
  if (isArray(value)) {
    return value
      .map((current) => encodeURIComponent(current.toString()))
      .map((current) => {
        return `${name}${multiValueIdentifier}=${current}`;
      })
      .join('&');
  } else {
    return `${name}=${encodeURIComponent(value.toString())}`;
  }
};

/**
 * encodes each entry in the query object and returns result
 * @param query query object containing name value pairs
 * @param multiValueIdentifier an identifier to be prepended to multivalue query names for
 * identification.
 */
export const encodeData = (
  query: { [name: string]: string | number | (string | number)[] },
  multiValueIdentifier: string = '[]',
): string => {
  return Object.keys(query)
    .map((name) => {
      return encodeDataEntry(name, query[name], multiValueIdentifier);
    })
    .join('&');
};

/**
 * expands the given unit based size to full numeric value
 * @param size - numeric or string unit-based size
 */
export const expandToNumeric = (size: number | string): number => {
  size = size.toString();
  if (/^\.\d+$/.test(size) || /^\d+(?:\.\d*)?$/.test(size)) {
    return Number.parseFloat(size);
  } else if (/^(\.\d+)([a-z]+)$/i.test(size) || /^(\d+(?:\.\d*)?)([a-z]+)$/i.test(size)) {
    let numeric = Number.parseFloat(RegExp.$1);
    const unit = RegExp.$2.toLowerCase();

    switch (unit) {
      case 'k':
        return numeric * 1000;
      case 'm':
      case 'mb':
        return numeric * 1000000;
      case 'g':
      case 'gb':
        return numeric * 1000000000;
      case 't':
      case 'tb':
        return numeric * 1000000000000;
    }
  } else {
    return 0;
  }
};

const convertToUnit = (
  units: string[],
  value: number,
  maximumFractionDigits: number,
  defaultUnit: string,
) => {
  const snapPoints = [1000000000000, 1000000000, 1000000, 1000];
  const length = snapPoints.length;
  let i = -1;

  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits });
  while (++i < length) {
    const snapPoint = snapPoints[i];
    const unit = units[i];

    if (value >= snapPoint) {
      return formatter.format(value / snapPoint) + unit;
    }
  }
  return value + defaultUnit;
};

/**
 * converts the given numeric value to file memory units
 *
 * @param value number value to be converted
 * @param maximumFractionDigits number of maximum decimal values allowed, defaults to 2
 */
export const convertToMemoryUnit = (value: number, maximumFractionDigits: number = 2) => {
  const units = ['tb', 'gb', 'mb', 'kb'];
  return convertToUnit(units, value, maximumFractionDigits, 'bytes');
};

/**
 * converts the given numeric value to monetary units
 *
 * @param value number value to be converted
 * @param maximumFractionDigits number of maximum decimal values allowed, defaults to 2
 */
export const convertToMonetaryUnit = (
  value: number,
  maximumFractionDigits: number = 2,
) => {
  const units = ['T', 'B', 'M', 'K'];
  return convertToUnit(units, value, maximumFractionDigits, '');
};

/**
 * strips out beginning and ending forward or backward slashes from the given path
 * @param path the path to work on
 */
export const stripSlashes = (path: string): string => {
  return path.replace(/^[\\/]+/, '').replace(/[\\/]+$/, '');
};

/**
 * returns only unique elements in the array, respecting element types. in essence, 0 is considered different from '0'
 * @param array the array to work on. remains untouched
 */
export const uniqueArray = <T = any>(array: T[]): T[] => {
  const typedHashes = Object.create(null, {
    boolean: {
      value: Object.create(null),
    },
    string: {
      value: Object.create(null),
    },
    number: {
      value: Object.create(null),
    },
  }); // create an object with no prototype.

  const unique: T[] = [];

  array.forEach((element) => {
    const elementType = isNull(element) ? 'null' : typeof element;
    if (elementType === 'null' || elementType === 'undefined') {
      if (typeof typedHashes[elementType] === 'undefined') {
        typedHashes[elementType] = 1;
        unique.push(element);
      }
    } else if (typeof typedHashes[elementType] === 'undefined') {
      // we are dealing with objects.
      if (unique.length === 0 || unique.every((current) => current !== element)) {
        unique.push(element);
      }
    } else {
      const elementToString = element.toString();
      if (typeof typedHashes[elementType][elementToString] === 'undefined') {
        typedHashes[elementType][elementToString] = 1;
        unique.push(element);
      }
    }
  });

  return unique;
};

/**
 * returns the global object, either window, self or null
 */
export const getGlobal = () => {
  if (isServiceWorker()) {
    return self;
  } else if (isBrowser()) {
    return host;
  } else {
    return null;
  }
};

/**
 * detects if local storage is supported
 */
export const localStorageSupported = () => {
  return getGlobal() && typeof getGlobal().localStorage !== 'undefined';
};

/**
 * detects if service worker is supported
 */
export const serviceWorkerSupported = () => {
  if (isServiceWorker()) {
    return true;
  } else if (isBrowser()) {
    return 'serviceWorker' in host.navigator;
  } else {
    return false;
  }
};

/**
 * detects if index db is supported
 */
export const indexDBSupported = () => {
  return getGlobal() && 'indexedDB' in getGlobal() && indexedDB !== null;
};

/**
 * detects if push notifications is supported
 */
export const notificationSupported = () => {
  if (isBrowser()) {
    return 'Notification' in getGlobal();
  } else if (isServiceWorker()) {
    return ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification');
  } else {
    return false;
  }
};

export type NotificationStatus = NotificationPermission | 'not-supported';

/**
 * returns the status of notification
 */
export const notificationStatus = (): NotificationStatus => {
  if (notificationSupported()) {
    return Notification.permission;
  } else {
    return 'not-supported';
  }
};

/**
 * detects if push manager is supported
 */
export const pushManagerSupported = () => {
  return (
    getGlobal() &&
    'PushManager' in getGlobal() &&
    PushSubscription.prototype.hasOwnProperty('getKey')
  );
};

/**
 * request for notification permission
 */
export const requestNotification = () => {
  const hasPromiseSupport = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  };

  return new Promise((resolve) => {
    if (notificationSupported()) {
      if (hasPromiseSupport()) {
        Notification.requestPermission().then((status) => {
          resolve(status);
        });
      } else {
        Notification.requestPermission((status) => {
          resolve(status);
        });
      }
    }
  });
};

/**
 * retrieves a value from storage
 */
export const getFromStorage = (key: string, defaultValue: any = null) => {
  if (localStorageSupported()) {
    const value = host.localStorage.getItem(key);
    if (isNull(value) || isUndefined(value)) {
      return defaultValue;
    } else {
      return value;
    }
  } else {
    return defaultValue;
  }
};

/**
 * sets a value to storage if storage is a supported.
 * returns true if succeeds, else returns false
 */
export const setToStorage = (key: string, value: string) => {
  if (localStorageSupported()) {
    host.localStorage.setItem(key, value);
    return true;
  }
  return false;
};

/**
 * returns the width and height of the given element or browser if no element is given without taking into account scrollbars
 * and clipped content due to overflow
 */
export const getClientSize = (elem?: HTMLElement | null) => {
  const result = {
    width: 0,
    height: 0,
  };

  const getW = (elem: HTMLElement) => {
    return elem.clientWidth;
  };

  const getH = (elem: HTMLElement) => {
    return elem.clientHeight;
  };

  if (elem) {
    result.width = getW(elem);
    result.height = getH(elem);
  } else if (isBrowser()) {
    result.width = Math.max(getW(root.documentElement));
    result.height = Math.max(getH(root.documentElement));
  }

  return result;
};

/**
 * returns the width and height of the given element or page if no element is given taking into account
 * clipped contents width and height due to overflow
 */
export const getScrollSize = (elem?: HTMLElement | null) => {
  const result = {
    width: 0,
    height: 0,
  };

  const getW = (elem: HTMLElement) => {
    return Math.max(elem.clientWidth, elem.scrollWidth);
  };

  const getH = (elem: HTMLElement) => {
    return Math.max(elem.clientHeight, elem.scrollHeight);
  };

  if (elem) {
    result.width = getW(elem);
    result.height = getH(elem);
  } else if (isBrowser()) {
    result.width = Math.max(getW(root.body), getW(root.documentElement));
    result.height = Math.max(getH(root.body), getH(root.documentElement));
  }

  return result;
};

/**
 * returns the current scroll positions of the given element or the page if no element is specified
 */
export const getScrollPositions = (elem?: HTMLElement | null) => {
  const result = {
    left: 0,
    top: 0,
  };

  const getLeftScroll = (elem: HTMLElement) => {
    return elem.scrollLeft || 0;
  };

  const getTopScroll = (elem: HTMLElement) => {
    return elem.scrollTop || 0;
  };

  if (elem) {
    result.left = getLeftScroll(elem);
    result.top = getTopScroll(elem);
  } else if (isBrowser()) {
    result.top = Math.max(
      host.pageYOffset,
      getTopScroll(root.body),
      getTopScroll(root.documentElement),
    );
    result.left = Math.max(
      host.pageXOffset,
      getLeftScroll(root.body),
      getLeftScroll(root.documentElement),
    );
  }

  return result;
};

/**
 * returns the current scroll percentages
 */
export const getScrolledPercentages = (elem?: HTMLElement | null) => {
  const result = {
    top: 0,
    left: 0,
    xPercent: 0,
    yPercent: 0,
  };

  const amountToScroll = (scrollSize: number, clientSize: number) => {
    return scrollSize - clientSize || 1;
  };

  const scrollSize = getScrollSize(elem);
  const scrollPositions = getScrollPositions(elem);
  const clientSize = getClientSize(elem);

  result.top = scrollPositions.top;
  result.left = scrollPositions.left;

  result.xPercent =
    scrollPositions.left / amountToScroll(scrollSize.width, clientSize.width);
  result.yPercent =
    scrollPositions.top / amountToScroll(scrollSize.height, clientSize.height);

  return result;
};

/**
 * returns true if the web app is launched in standalone mode, for pwa
 */
export const isStandaloneApp = () => {
  if (isBrowser()) {
    if (navigator.standalone) {
      return true;
    } else if (matchMedia && matchMedia('(display-mode: standalone)').matches) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

/**
 * sets timeout for the given amount of time
 * @param time
 */
export const sleep = (time: number = 3000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export * from '@teclone/global';
