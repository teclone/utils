import { makeArray, get } from '../../helpers';

/**
 * returns the value for the first key that exists in the object otherwise,
 * it returns the default value
 */
export const pickValue = <T = any>(
  object: object,
  keys: string | string[],
  defaultValue?: T,
): T => {
  for (const key of makeArray(keys)) {
    if (get(object, key) !== undefined) {
      return object[key];
    }
  }
  return defaultValue;
};
