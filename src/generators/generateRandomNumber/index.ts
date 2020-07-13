/**
 * generates a random number between min (inclusive) and max (inclusive)
 * @param min the min value that can be generated
 * @param max the maximum value that can be generated
 */
export const generateRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
