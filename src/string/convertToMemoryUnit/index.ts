import { convertToUnit } from '../convertToUnit';

/**
 * converts the given numeric value to monetary units
 *
 * @param value number value to be converted
 * @param maximumFractionDigits number of maximum decimal values allowed, defaults to 2
 */
export const convertToMonetaryUnit = (
  value: number,
  maximumFractionDigits: number = 2,
) => {
  const units = ['T', 'B', 'M', 'K'];
  return convertToUnit(units, value, maximumFractionDigits, '');
};
