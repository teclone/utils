import { notificationSupported } from '../notificationSupported';

export type NotificationStatus = NotificationPermission | 'not-supported';

/**
 * returns the status of notification
 */
export const notificationStatus = (): NotificationStatus => {
  if (notificationSupported()) {
    return Notification.permission;
  } else {
    return 'not-supported';
  }
};
