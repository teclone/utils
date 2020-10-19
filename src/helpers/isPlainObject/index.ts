import { isObject } from '../../helpers';

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
