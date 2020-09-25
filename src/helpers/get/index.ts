import { isArray } from '../../typeof';

export const get = <T = any>(
  obj: object,
  key: string | number | boolean,
  def?: T
): T => {
  try {
    const keys = key.toString().split('.');

    let currentObj = obj;
    let startIndex = -1;

    while (++startIndex < keys.length - 1) {
      currentObj = currentObj ? currentObj[keys[startIndex]] : undefined;
    }

    const lastKey = keys.pop();
    if (isArray(currentObj) && /^[+-]\d+$/.test(lastKey)) {
      const numberKey = parseInt(lastKey);

      const multiplier: number = numberKey < 0 ? -1 : 1;
      const absKey = Math.abs(numberKey);

      if (currentObj.length > absKey) {
        const value = currentObj[absKey];
        if (typeof value === 'number') {
          return (value * multiplier) as any;
        } else {
          return value as any;
        }
      }
    } else if (currentObj) {
      return currentObj[lastKey] || def;
    }
  } catch (ex) {}

  return def;
};
