import { getGlobal } from '../getGlobal';

export const hasIntersectionObserver = () =>
  getGlobal() && typeof getGlobal().IntersectionObserver !== 'undefined';
