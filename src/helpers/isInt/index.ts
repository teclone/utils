/**
 * test if argument starts with integer, whether positive or negative
 */
export const isInt = (arg: any): arg is string => {
  return /^[-+]?\d+/.test(arg);
};
