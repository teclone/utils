import { isBrowser, makeArray, isString } from '../../helpers';

/**
 * detects if the given path matches the current path
 * @param url
 */
export const isActivePath = (
  path: string,
  currentPath?: string,
  prefixes?: string | RegExp | Array<string | RegExp>
) => {
  const testPrefix = (prefix: string | RegExp) => {
    if (isString(prefix)) {
      return path === prefix;
    } else {
      return prefix.test(path);
    }
  };

  currentPath =
    !currentPath && isBrowser() ? window.location.pathname : currentPath;
  if (!currentPath || !path.startsWith('/')) {
    return false;
  }
  if (path === currentPath) {
    return true;
  }

  prefixes = makeArray(prefixes).concat('/');
  if (prefixes.length && prefixes.some(testPrefix)) {
    return false;
  }
  return currentPath.startsWith(path);
};
