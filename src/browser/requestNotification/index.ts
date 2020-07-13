import { notificationSupported } from '../notificationSupported';

/**
 * request for notification permission
 */
export const requestNotification = () => {
  const hasPromiseSupport = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  };

  return new Promise((resolve) => {
    if (notificationSupported()) {
      if (hasPromiseSupport()) {
        Notification.requestPermission().then((status) => {
          resolve(status);
        });
      } else {
        Notification.requestPermission((status) => {
          resolve(status);
        });
      }
    }
  });
};
