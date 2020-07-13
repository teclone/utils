import { CASE_STYLES } from '../../constants';
import { applyCase } from '../applyCase';
import { makeObject } from '../../helpers';

/**
 * expands the string key and turns it into an object property
 */
export const expandProperty = <T extends object>(
  target: T,
  key: string,
  value: any,
  delimiter: string = '.',
  caseStyle: number = CASE_STYLES.CAMEL_CASE,
): T & { [propName: string]: any } => {
  const keys = key.split(delimiter);
  const lastKey = applyCase(keys.pop(), caseStyle);

  const lastObject: object = keys.reduce((current, key) => {
    key = applyCase(key, caseStyle);
    current[key] = makeObject(current[key]);
    return current[key];
  }, target);

  lastObject[lastKey] = value;

  return target;
};
