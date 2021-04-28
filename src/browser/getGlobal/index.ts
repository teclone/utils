import { isServiceWorker, isBrowser } from '../../helpers';

/**
 * returns the global object, either window, self or null
 */
export const getGlobal = () => {
  if (isServiceWorker()) {
    return self;
  } else if (isBrowser()) {
    return window;
  } else {
    return null;
  }
};
