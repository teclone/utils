import { toString } from '../../helpers';

/**
 * test if argument is an array
 */
export const isArray = <T>(arg: T | T[]): arg is T[] => {
  return toString.call(arg) === '[object Array]' || arg instanceof Array;
};
