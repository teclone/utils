import { isBrowser, isElementNode } from '../../helpers';
import { DOMTarget, resolveDomTarget } from '../resolveDomTarget';

/**
 * returns the current scroll positions of the given element or the page if no element is specified
 */
export const getScrollPositions = (elem?: DOMTarget) => {
  const result = {
    left: 0,
    top: 0,
  };

  const getLeftScroll = (elem: Element) => {
    return elem.scrollLeft || 0;
  };

  const getTopScroll = (elem: Element) => {
    return elem.scrollTop || 0;
  };

  const resolvedElem = resolveDomTarget(elem);

  if (isElementNode(resolvedElem)) {
    result.left = getLeftScroll(resolvedElem);
    result.top = getTopScroll(resolvedElem);
  } else if (isBrowser()) {
    result.top = Math.max(
      window.pageYOffset,
      getTopScroll(document.body),
      getTopScroll(document.documentElement)
    );
    result.left = Math.max(
      window.pageXOffset,
      getLeftScroll(document.body),
      getLeftScroll(document.documentElement)
    );
  }

  return result;
};
