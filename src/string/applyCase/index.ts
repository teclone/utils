import { CASE_STYLES } from '../../constants';
import { camelCase } from '../camelCase';
import { snakeCase } from '../snakeCase';

/**
 * applies case based on the case style chosen
 * @param text text to apply case on
 * @param caseStyle case style of choice
 * @param delimiter optional delimiter string or regex
 */
export const applyCase = (
  text: string,
  caseStyle: number,
  delimiter: string | RegExp = /[-_\s]/,
): string => {
  switch (caseStyle) {
    case CASE_STYLES.CAMEL_CASE:
      return camelCase(text, delimiter);

    case CASE_STYLES.SNAKE_CASE:
      return snakeCase(text, delimiter);

    default:
      return text;
  }
};
