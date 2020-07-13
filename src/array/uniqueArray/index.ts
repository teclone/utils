import { isNull } from '../../typeof';

/**
 * returns only unique elements in the array, respecting element types. in essence, 0 is considered different from '0'
 * @param array the array to work on. remains untouched
 */
export const uniqueArray = <T = any>(array: T[]): T[] => {
  const typedHashes = Object.create(null, {
    boolean: {
      value: Object.create(null),
    },
    string: {
      value: Object.create(null),
    },
    number: {
      value: Object.create(null),
    },
  }); // create an object with no prototype.

  const unique: T[] = [];

  array.forEach((element) => {
    const elementType = isNull(element) ? 'null' : typeof element;
    if (elementType === 'null' || elementType === 'undefined') {
      if (typeof typedHashes[elementType] === 'undefined') {
        typedHashes[elementType] = 1;
        unique.push(element);
      }
    } else if (typeof typedHashes[elementType] === 'undefined') {
      // we are dealing with objects.
      if (unique.length === 0 || unique.every((current) => current !== element)) {
        unique.push(element);
      }
    } else {
      const elementToString = element.toString();
      if (typeof typedHashes[elementType][elementToString] === 'undefined') {
        typedHashes[elementType][elementToString] = 1;
        unique.push(element);
      }
    }
  });

  return unique;
};
