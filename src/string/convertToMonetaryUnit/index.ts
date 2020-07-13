import { convertToUnit } from '../convertToUnit';

/**
 * converts the given numeric value to file memory units
 *
 * @param value number value to be converted
 * @param maximumFractionDigits number of maximum decimal values allowed, defaults to 2
 */
export const convertToMemoryUnit = (value: number, maximumFractionDigits: number = 2) => {
  const units = ['tb', 'gb', 'mb', 'kb'];
  return convertToUnit(units, value, maximumFractionDigits, 'bytes');
};
