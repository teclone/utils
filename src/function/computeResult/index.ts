import { isCallable } from '../../helpers';

export type ComputableResult<
  ResultType,
  Callback = (...args: any[]) => ResultType
> = ResultType | Callback;

/**
 * if first argument is a function, it runs the functions and returns the result
 * else it returns the first argument as the result.
 */
export const computeResult = <T>(
  resultOrCallback: ComputableResult<T>,
  ...args: any[]
) => {
  if (isCallable(resultOrCallback)) {
    return resultOrCallback(...args);
  } else {
    return resultOrCallback;
  }
};
