import { isActivePath } from './index';

describe('isActivePath', function () {
  describe(`isActivePath(path: string, currentPath?: string: prefixes: string | RegExp | Array<string | RegExp>)`, function () {
    it(`should return true if the given path leads to the current path`, function () {
      expect(isActivePath('/en', '/en/politics')).toBeTruthy();
    });

    it(`should return false if the given path leads to the current path, but it is the base path or prefix path`, function () {
      expect(isActivePath('/', '/en/politics')).toBeFalsy();
      expect(isActivePath('/en', '/en/politics', ['/en'])).toBeFalsy();
    });
  });
});
