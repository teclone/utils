import { Callback, makeArray, get, isObject } from '../../helpers';

export interface CallbackCache<C extends Function = Callback, P = any> {
  callback: C;
  parameters?: P | P[];
  scope?: object;
  [propName: string]: any;
}

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
  parameters?: T | T[]
): (...args) => any;

/**
 * generates a callback function, scoping the execution with optional extra parameters
 */
export function scopeCallback<T = any>(
  callback: Callback | CallbackCache,
  scope: object = null,
  parameters: T | T[] = []
) {
  if (isObject<CallbackCache>(callback)) {
    return (...args) => {
      parameters = makeArray(callback.parameters);
      scope = get(callback, 'scope', null);

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
