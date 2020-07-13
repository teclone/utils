/**
 * flattens arrays to any deep length
 * @param arr array to flatten
 * @param depth the depth value to enter
 */
export const flatten = <T>(array: T[], depth: number = 1) => {
  if (depth < 1) {
    return Array.prototype.slice.call(array);
  }
  return (function flat(arr: T[]) {
    let result: T[] = [];

    const len = arr.length;
    let i = 0;
    depth = depth - 1;
    while (i < len) {
      const el = arr[i++];
      if (Array.isArray(el)) {
        result = result.concat(depth > 0 ? flat(el) : el);
      } else {
        result.push(el);
      }
    }
    return result;
  })(array);
};
