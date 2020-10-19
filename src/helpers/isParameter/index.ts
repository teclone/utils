/**
 * test if argument is a valid method parameter. by default, all types are valid parameters
 * except undefined.
 */
export const isParameter = (arg: any, isNullable: boolean = true) => {
  if (typeof arg === 'undefined') {
    return false;
  }

  if (arg === null) {
    return isNullable;
  }

  return true;
};
