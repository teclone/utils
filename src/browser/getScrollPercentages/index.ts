import { getScrollSize } from '../getScrollSize';
import { getScrollPositions } from '../getScrollPositions';
import { getClientSize } from '../getClientSize';

/**
 * returns the current scroll percentages
 */
export const getScrolledPercentages = (elem?: HTMLElement | null) => {
  const result = {
    top: 0,
    left: 0,
    xPercent: 0,
    yPercent: 0,
  };

  const amountToScroll = (scrollSize: number, clientSize: number) => {
    return scrollSize - clientSize || 1;
  };

  const scrollSize = getScrollSize(elem);
  const scrollPositions = getScrollPositions(elem);
  const clientSize = getClientSize(elem);

  result.top = scrollPositions.top;
  result.left = scrollPositions.left;

  result.xPercent =
    scrollPositions.left / amountToScroll(scrollSize.width, clientSize.width);
  result.yPercent =
    scrollPositions.top / amountToScroll(scrollSize.height, clientSize.height);

  return result;
};
