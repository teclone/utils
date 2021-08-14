import { makeArray, get, isArray } from '../../helpers';

/**
 * returns the value for the first key that exists in the object whose value is an array otherwise,
 * it returns the default value
 */
export const pickArray = <T = any>(
  object: object,
  keys: string | string[],
  defaultValue: T[] = []
): T[] => {
  let value;
  keys = makeArray(keys);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    value = get(object, key);
    if (isArray(value)) {
      return value;
    }
  }
  return defaultValue;
};
