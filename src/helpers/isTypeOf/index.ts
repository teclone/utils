import { makeArray } from '../makeArray';

/**
 * asserts that the given object if is of the given type T if every prop in props exist in the object
 * @param prop property to check
 * @param target the target object
 */
export const isTypeOf = <T extends O, O extends object = any>(
  target: O,
  props: string | string[]
): target is T => {
  return makeArray(props).every((prop) => typeof target[prop] !== 'undefined');
};
