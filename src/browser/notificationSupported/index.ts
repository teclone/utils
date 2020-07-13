import { isBrowser, isServiceWorker } from '../../helpers';
import { getGlobal } from '../getGlobal';

/**
 * detects if push notifications is supported
 */
export const notificationSupported = () => {
  if (isBrowser()) {
    return 'Notification' in getGlobal();
  } else if (isServiceWorker()) {
    return ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification');
  } else {
    return false;
  }
};
