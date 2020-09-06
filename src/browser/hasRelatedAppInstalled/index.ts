/**
 * checks if the application has related apps installed
 * @param appPackageName
 */
export const hasRelatedAppInstalled = (
  appPackageName: string
): Promise<boolean> => {
  if ('getInstalledRelatedApps' in navigator) {
    return navigator.getInstalledRelatedApps().then((results) => {
      return (
        results.length > 0 &&
        results.some((result) => result.id === appPackageName)
      );
    });
  } else {
    return Promise.resolve(false);
  }
};
