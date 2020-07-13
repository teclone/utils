export const get = <T = any>(obj: object, key: string | number | boolean, def?: T): T => {
  try {
    const keyArray =
      typeof key === 'string' || typeof key === 'boolean'
        ? key.toString().split('.')
        : [key];
    let start = -1,
      end = keyArray.length;

    while (++start < end) {
      obj = obj ? obj[keyArray[start]] : undefined;
    }
    return (obj === undefined ? def : obj) as any;
  } catch (ex) {
    return def;
  }
};
