import { getGlobal } from '../getGlobal';

/**
 * checks if the application has related apps installed
 * @param appPackageName
 */
export const hasRelatedAppInstalled = (
  appPackageName: string
): Promise<boolean> => {
  const global = getGlobal();
  if (global && 'getInstalledRelatedApps' in global.navigator) {
    return global.navigator.getInstalledRelatedApps().then((results) => {
      return (
        results.length > 0 &&
        results.some((result) => result.id === appPackageName)
      );
    });
  } else {
    return Promise.resolve(false);
  }
};
