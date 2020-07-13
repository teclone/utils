import { isServiceWorker, isBrowser, host } from '../../helpers';

/**
 * returns the global object, either window, self or null
 */
export const getGlobal = () => {
  if (isServiceWorker()) {
    return self;
  } else if (isBrowser()) {
    return host;
  } else {
    return null;
  }
};
