/**
 * test if argument starts with number(integer or float), whether positive or negative
 */
export const isNumeric = (arg: any): arg is string => {
  return /^[-+.]?\d+/.test(arg);
};
