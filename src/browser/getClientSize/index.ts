import { isBrowser, isElementNode, root } from '../../helpers';
import { DOMTarget, resolveDomTarget } from '../resolveDomTarget';

/**
 * returns the width and height of the given element or browser if no element is given without taking into account scrollbars
 * and clipped content due to overflow
 */
export const getClientSize = (elem?: DOMTarget) => {
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

  const resolvedElem = resolveDomTarget(elem);
  if (isElementNode(resolvedElem)) {
    result.width = getW(resolvedElem);
    result.height = getH(resolvedElem);
  } else if (isBrowser()) {
    result.width = Math.max(getW(root.documentElement));
    result.height = Math.max(getH(root.documentElement));
  }

  return result;
};
