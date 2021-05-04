import { toString } from '../toString';

/**
 * test if argument is a function
 */
export const isCallable = (arg: any): arg is Function => {
  return (
    (toString(arg) === '[object Function]' || arg instanceof Function) &&
    !(arg instanceof RegExp)
  );
};
