/**
 * returns true if key is not set in the given object or key is set and its value is truthy
 */
export const keyNotSetOrTrue = (object: object, key: string): boolean => {
  return typeof object[key] === 'undefined' || !!object[key];
};
