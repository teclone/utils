import { getGlobal } from '../getGlobal';

/**
 * detects if index db is supported
 */
export const indexDBSupported = () => {
  return getGlobal() && 'indexedDB' in getGlobal() && indexedDB !== null;
};
