/**
 * returns true if key is set in the given object and its value is truthy
 */
export const keySetAndTrue = (object: object, key: string): boolean => {
  return typeof object[key] !== 'undefined' && !!object[key];
};
