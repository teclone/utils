import { toString } from '../toString';

/**
 * test if argument is an array
 */
export const isArray = <T>(arg: T | T[]): arg is T[] => {
  return toString(arg) === '[object Array]' || arg instanceof Array;
};
