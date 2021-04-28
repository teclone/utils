export interface Callback {
  (...args: any[]): any;
  [propName: string]: any;
}

/**
 * schedules the execution of a scoped callback to a given time
 */
export const scheduleCallback = (
  scopedCallback: Callback,
  time: number = 1000
) => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(scopedCallback());
    }, time);
  });
};
