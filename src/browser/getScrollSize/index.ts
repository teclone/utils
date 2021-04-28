import { isBrowser, isElementNode } from '../../helpers';
import { DOMTarget, resolveDomTarget } from '../resolveDomTarget';

/**
 * returns the width and height of the given element or page if no element is given taking into account
 * clipped contents width and height due to overflow
 */
export const getScrollSize = (elem?: DOMTarget) => {
  const result = {
    width: 0,
    height: 0,
  };

  const getW = (elem: Element) => {
    return Math.max(elem.clientWidth, elem.scrollWidth);
  };

  const getH = (elem: Element) => {
    return Math.max(elem.clientHeight, elem.scrollHeight);
  };

  const resolvedElem = resolveDomTarget(elem);

  if (isElementNode(resolvedElem)) {
    result.width = getW(resolvedElem);
    result.height = getH(resolvedElem);
  } else if (isBrowser()) {
    result.width = Math.max(
      getW(document.body),
      getW(document.documentElement)
    );
    result.height = Math.max(
      getH(document.body),
      getH(document.documentElement)
    );
  }

  return result;
};
