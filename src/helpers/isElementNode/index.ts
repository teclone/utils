/**
 * detects if argument is an element node
 */
export const isElementNode = (arg: any): arg is Element => {
  return arg?.nodeType === 1;
};
