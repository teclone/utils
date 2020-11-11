import { isBrowser, host, root, isElementNode } from '../../helpers';
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
      host.pageYOffset,
      getTopScroll(root.body),
      getTopScroll(root.documentElement)
    );
    result.left = Math.max(
      host.pageXOffset,
      getLeftScroll(root.body),
      getLeftScroll(root.documentElement)
    );
  }

  return result;
};
