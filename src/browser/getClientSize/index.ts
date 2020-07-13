import { isBrowser, root } from '../../helpers';

/**
 * returns the width and height of the given element or browser if no element is given without taking into account scrollbars
 * and clipped content due to overflow
 */
export const getClientSize = (elem?: HTMLElement | null) => {
  const result = {
    width: 0,
    height: 0,
  };

  const getW = (elem: HTMLElement) => {
    return elem.clientWidth;
  };

  const getH = (elem: HTMLElement) => {
    return elem.clientHeight;
  };

  if (elem) {
    result.width = getW(elem);
    result.height = getH(elem);
  } else if (isBrowser()) {
    result.width = Math.max(getW(root.documentElement));
    result.height = Math.max(getH(root.documentElement));
  }

  return result;
};
