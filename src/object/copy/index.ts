import { isObject } from '../../helpers';

/**
 * copies the objects into the target object, without creating references, unlike Object.assign
 */
export const copy = <T extends object, O extends object>(
  target: T,
  ...objects: O[]
): T &
  {
    [P in keyof O]: O[P];
  } => {
  const isValidKey = (key) => {
    return (
      key !== '__proto__' &&
      key !== 'constructor' &&
      key !== 'prototype' &&
      key !== 'theming'
    );
  };

  const cloneEach = (dest: any, value: any) => {
    // if (isArray(value)) {
    //   return value.map((current) => cloneEach(null, current));
    // }

    if (isObject(dest) && isObject(value)) {
      return copy(dest, value);
    }

    return value;
  };

  for (const object of objects) {
    if (isObject(object)) {
      for (let key in object) {
        if (isValidKey(key)) {
          target[key as any] = cloneEach(target[key as any], object[key]);
        }
      }
    }
  }

  return target as T & { [P in keyof O]: O[P] };
};
