import { getGlobal } from '../getGlobal';

/**
 * detects if local storage is supported
 */
export const localStorageSupported = () => {
  return getGlobal() && typeof getGlobal().localStorage !== 'undefined';
};
