/**
 * converts text to snake like casing
 */
export const snakeCase = (
  text: string,
  delimiter: string | RegExp = /[-_\s]/,
): string => {
  return text
    .split(delimiter)
    .map((token) => token.toLowerCase())
    .join('_');
};
