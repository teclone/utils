import { encodeDataEntry } from '../encodeDataEntry';

/**
 * encodes each entry in the query object and returns result
 * @param query query object containing name value pairs
 * @param multiValueIdentifier an identifier to be prepended to multivalue query names for
 * identification.
 */
export const encodeData = (
  query: { [name: string]: string | number | (string | number)[] },
  multiValueIdentifier: string = '[]',
): string => {
  return Object.keys(query)
    .map((name) => {
      return encodeDataEntry(name, query[name], multiValueIdentifier);
    })
    .join('&');
};
