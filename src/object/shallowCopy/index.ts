import { isArray, isObject } from '../../helpers';

/**
 * copies objects into the target object, shallowly, it means that inner objects can create references
 */
export const shallowCopy = <T extends object, O extends object>(
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
    if (isArray(value)) {
      return value.map((current) => current);
    }

    if (isObject(dest) && isObject(value)) {
      return shallowCopy(dest, value);
    }

    return value;
  };

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    if (isObject(object)) {
      const keys = Object.keys(object);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (isValidKey(key)) {
          target[key as any] = cloneEach(target[key as any], object[key]);
        }
      }
    }
  }

  return target as T & { [P in keyof O]: O[P] };
};
