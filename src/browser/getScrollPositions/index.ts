import { isBrowser, host, root } from '../../helpers';

/**
 * returns the current scroll positions of the given element or the page if no element is specified
 */
export const getScrollPositions = (elem?: HTMLElement | null) => {
  const result = {
    left: 0,
    top: 0,
  };

  const getLeftScroll = (elem: HTMLElement) => {
    return elem.scrollLeft || 0;
  };

  const getTopScroll = (elem: HTMLElement) => {
    return elem.scrollTop || 0;
  };

  if (elem) {
    result.left = getLeftScroll(elem);
    result.top = getTopScroll(elem);
  } else if (isBrowser()) {
    result.top = Math.max(
      host.pageYOffset,
      getTopScroll(root.body),
      getTopScroll(root.documentElement),
    );
    result.left = Math.max(
      host.pageXOffset,
      getLeftScroll(root.body),
      getLeftScroll(root.documentElement),
    );
  }

  return result;
};
