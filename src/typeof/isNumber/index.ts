/**
 * tests if argument is a number
 */
export const isNumber = (arg: any): arg is number => {
  return typeof arg === 'number' && !isNaN(arg);
};
