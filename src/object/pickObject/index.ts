import { makeArray, get, isObject } from '../../helpers';

/**
 * returns the value for the first key that exists in the object whose value is an object otherwise,
 * it returns the default value
 */
export const pickObject = (
  object: object,
  keys: string | string[],
  defaultValue: object = {}
): object => {
  let value;
  keys = makeArray(keys);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    value = get(object, key);
    if (isObject(value)) {
      return value;
    }
  }
  return defaultValue;
};
