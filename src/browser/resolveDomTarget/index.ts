import { isBrowser, isElementNode } from '../../helpers';

export type GlobalWindow = Window & typeof globalThis;

export interface RefDomTarget {
  current: Element;
  [p: string]: any;
}

export type DOMTarget = GlobalWindow | RefDomTarget | Element | null;

export const resolveDomTarget = (target: DOMTarget): Element | GlobalWindow => {
  let arg: any = target;
  if (arg && arg.current && isElementNode(arg.current)) {
    return arg.current;
  } else if (isElementNode(target)) {
    return target;
  } else if (isBrowser()) {
    return window;
  }
  return null;
};
