import { localStorageSupported } from '../localStorageSupported';
import { host } from '../../helpers';

/**
 * sets a value to storage if storage is a supported.
 * returns true if succeeds, else returns false
 */
export const setToStorage = (key: string, value: string) => {
  if (localStorageSupported()) {
    host.localStorage.setItem(key, value);
    return true;
  }
  return false;
};
