import { isArray, isCallable, isRegex, isObject } from '../../typeof';
import { makeObject } from '../../helpers/makeObject';

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
  const cloneEach = (dest: any, value: any) => {
    if (isArray(value)) {
      return value.map((current) => cloneEach(null, current));
    }

    if (isCallable(value) || isRegex(value) || !isObject(value)) {
      return value;
    }

    dest = makeObject(dest);
    for (const [key, current] of Object.entries(value)) {
      dest[key] = cloneEach(dest[key], current);
    }
    return dest;
  };

  objects.forEach((item) => {
    if (isObject(item)) {
      for (const [key, value] of Object.entries(item)) {
        target[key] = cloneEach(target[key], value);
      }
    }
  });

  return target as T & { [P in keyof O]: O[P] };
};
