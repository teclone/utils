import { digits } from '../../constants';

/**
 * generates random digit of given character length
 */
export const generateRandomDigits = (length: number = 4): string => {
  const result: string[] = [];

  while (length--) {
    result.push(digits.charAt(Math.floor(Math.random() * digits.length)));
  }
  return result.join('');
};
