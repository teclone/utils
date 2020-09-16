/**
 * converts text to pascal like casing
 */
export const pascalCase = (
  text: string,
  delimiter: string | RegExp = /[-_\s]/
): string => {
  return text
    .split(delimiter)
    .map((token) => {
      return token.charAt(0).toUpperCase() + token.substring(1);
    })
    .join('');
};
