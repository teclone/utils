import { isCallable } from '../../helpers';

export type ComputableAsyncResult<
  ResultType,
  Callback = (...args: any[]) => ResultType | Promise<ResultType>
> = ResultType | Callback;

/**
 * if first argument is a function, it runs the functions and returns the result
 * else it returns the first argument as the result.
 */
export const computeAsyncResult = <T>(
  resultOrCallback: ComputableAsyncResult<T>,
  ...args: any[]
) => {
  if (isCallable(resultOrCallback)) {
    return resultOrCallback(...args);
  } else {
    return resultOrCallback;
  }
};
