import { isArray } from '../../helpers';

/**
 * encodes the query name and value and returns the result
 * @param name query name
 * @param value query value
 * @param multiValueIdentifier an identifier to be prepended to multivalue query names for
 * identification.
 */
export const encodeDataEntry = (
  name: string,
  value: string | number | (string | number)[],
  multiValueIdentifier: string = '[]'
): string => {
  name = encodeURIComponent(name);
  if (isArray(value)) {
    return value
      .map((current) => encodeURIComponent(current.toString()))
      .map((current) => {
        return `${name}${multiValueIdentifier}=${current}`;
      })
      .join('&');
  } else {
    return `${name}=${encodeURIComponent(value.toString())}`;
  }
};
