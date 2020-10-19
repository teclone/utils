import { isParameter } from '../isParameter';

/**
 * puts argument into an array if it is not an array,
 */
export const makeArray = <T>(
  arg: T | T[] | null | undefined,
  isNullable: boolean = false
): T[] => {
  if (Array.isArray(arg)) {
    return arg;
  }

  return isParameter(arg, isNullable) ? [arg] : [];
};
