import { localStorageSupported } from '../localStorageSupported';
import { host, isNull, isUndefined } from '../../helpers';

/**
 * retrieves a value from storage
 */
export const getFromStorage = (key: string, defaultValue: any = null) => {
  if (localStorageSupported()) {
    const value = host.localStorage.getItem(key);
    if (isNull(value) || isUndefined(value)) {
      return defaultValue;
    } else {
      return value;
    }
  } else {
    return defaultValue;
  }
};
