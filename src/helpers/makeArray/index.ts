import { isArray } from '../../typeof/isArray';
import { isParameter } from '../../typeof/isParameter';

/**
 * puts argument into an array if it is not an array,
 */
export const makeArray = <T>(
  arg: T | T[] | null | undefined,
  isNullable: boolean = false,
): T[] => {
  if (isArray(arg)) {
    return arg;
  }

  return isParameter(arg, isNullable) ? [arg] : [];
};
