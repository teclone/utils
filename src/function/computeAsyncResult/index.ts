import { isCallable } from '../../helpers';

/**
 * if first argument is a function, it runs the functions and returns the result
 * else it returns the first argument as the result.
 */
export const computeAsyncResult = <T>(
  resultOrCallback: T | ((...args: any[]) => T | Promise<T>),
  ...args: any[]
) => {
  if (isCallable(resultOrCallback)) {
    return resultOrCallback(...args);
  } else {
    return resultOrCallback;
  }
};
