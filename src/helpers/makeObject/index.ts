import { isObject } from '../../typeof';

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
