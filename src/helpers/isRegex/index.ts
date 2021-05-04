import { toString } from '../toString';

/**
 * test if argument is a regular expressions
 */
export const isRegex = (arg: any): arg is RegExp => {
  return toString(arg) === '[object RegExp]' && arg instanceof RegExp;
};
