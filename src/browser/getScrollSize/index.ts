import { isBrowser, root } from '../../helpers';

/**
 * returns the width and height of the given element or page if no element is given taking into account
 * clipped contents width and height due to overflow
 */
export const getScrollSize = (elem?: HTMLElement | null) => {
  const result = {
    width: 0,
    height: 0,
  };

  const getW = (elem: HTMLElement) => {
    return Math.max(elem.clientWidth, elem.scrollWidth);
  };

  const getH = (elem: HTMLElement) => {
    return Math.max(elem.clientHeight, elem.scrollHeight);
  };

  if (elem) {
    result.width = getW(elem);
    result.height = getH(elem);
  } else if (isBrowser()) {
    result.width = Math.max(getW(root.body), getW(root.documentElement));
    result.height = Math.max(getH(root.body), getH(root.documentElement));
  }

  return result;
};
