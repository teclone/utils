import { isCallable } from '../isCallable';
import { isArray } from '../isArray';
import { isRegex } from '../isRegex';

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
