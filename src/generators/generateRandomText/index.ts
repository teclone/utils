import { alphabets, digits } from '../../constants';

/**
 * generates a random text of given character length
 */
export const generateRandomText = (
  length: number = 4,
  exemptNumerals: boolean = false,
): string => {
  const letters = alphabets + alphabets.toUpperCase();

  const chars = exemptNumerals ? letters : letters + digits;
  const result: string[] = [];

  while (length--) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join('');
};
