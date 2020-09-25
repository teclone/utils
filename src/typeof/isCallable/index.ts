import { toString } from '../../helpers';

/**
 * test if argument is a function
 */
export const isCallable = (arg: any): arg is Function => {
  return (
    (toString.call(arg) === '[object Function]' || arg instanceof Function) &&
    !(arg instanceof RegExp)
  );
};