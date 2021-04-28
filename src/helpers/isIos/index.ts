import { isBrowser } from '../isBrowser';

/**
 * returns true if browser is ios
 */
export const isIos = (): boolean => {
  return (
    isBrowser() &&
    /iphone|ios|ipad|ipad/i.test(navigator.userAgent || navigator.platform)
  );
};
