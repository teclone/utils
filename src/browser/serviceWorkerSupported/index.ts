import { isServiceWorker, isBrowser, host } from '../../helpers';

/**
 * detects if service worker is supported
 */
export const serviceWorkerSupported = () => {
  if (isServiceWorker()) {
    return true;
  } else if (isBrowser()) {
    return 'serviceWorker' in host.navigator;
  } else {
    return false;
  }
};
