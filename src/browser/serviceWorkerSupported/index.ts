import { isServiceWorker, isBrowser } from '../../helpers';

/**
 * detects if service worker is supported
 */
export const serviceWorkerSupported = () => {
  if (isServiceWorker()) {
    return true;
  } else if (isBrowser()) {
    return 'serviceWorker' in window.navigator;
  } else {
    return false;
  }
};
