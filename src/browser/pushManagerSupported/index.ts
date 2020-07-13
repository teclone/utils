import { getGlobal } from '../getGlobal';

/**
 * detects if push manager is supported
 */
export const pushManagerSupported = () => {
  return (
    getGlobal() &&
    'PushManager' in getGlobal() &&
    PushSubscription.prototype.hasOwnProperty('getKey')
  );
};
