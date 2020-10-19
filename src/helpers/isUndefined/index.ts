/**
 * tests if argument is undefined
 */
export const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === 'undefined';
};
