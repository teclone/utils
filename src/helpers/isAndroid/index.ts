import { isBrowser } from '@teclone/global';

/**
 * returns true if browser is android
 */
export const isAndroid = (): boolean => {
  return (
    isBrowser() && /android/i.test(navigator.userAgent || navigator.platform)
  );
};
