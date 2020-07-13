/**
 * fills an array to the given length with the given value. if no value is given, it fills the array using the last
 * element in the array. if array is in turn empty, it fills with undefined
 * @param arg
 */
export const fillArray = <T>(arg: T[], length: number, value?: T): T[] => {
  const difference = length - arg.length;
  value = value ?? (arg.length > 0 ? arg[arg.length - 1] : undefined);
  if (difference > 0) {
    return [...arg, ...Array(difference).fill(value)];
  } else {
    return [...arg];
  }
};
