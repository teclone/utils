/**
 * capitalizes the given text
 * @param text text to capitalize
 */
export const capitalize = (text: string): string => {
  return text.length > 0
    ? text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    : '';
};
