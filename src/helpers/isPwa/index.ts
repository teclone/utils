import { isBrowser } from '../isBrowser';

/**
 * returns true if the web app is launched in standalone mode, for pwa
 */
export const isPwa = () => {
  if (isBrowser()) {
    if (navigator.standalone) {
      return true;
    } else if (matchMedia && matchMedia('(display-mode: standalone)').matches) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
