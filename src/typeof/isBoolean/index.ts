/**
 * tests if argument is boolean
 */
export const isBoolean = (arg: any): arg is boolean => {
  return typeof arg === 'boolean';
};
