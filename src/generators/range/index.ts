import { alphabets } from '../../constants';
import { isString } from '../../typeof';

/**
 * creates a range of numerical values
 */
export function range(from: number, to: number, step?: number): number[];

/**
 * creates a range of alphabetic characters
 */
export function range(from: string, to: string, step?: number): string[];

/**
 * creates a range of values
 */
export function range(
  from: string | number,
  to: string | number,
  step: number = 1,
): number[] | string[] {
  const result = [];
  const letters =
    from.toString().toLowerCase() !== from ? alphabets.toUpperCase() : alphabets;
  step = step <= 0 ? 1 : step;

  // resolve start and end points
  let start: number = null;
  let end: number = null;

  if (isString(from)) {
    start = alphabets.indexOf(from.toLowerCase());
    end = alphabets.indexOf((to as string).toLowerCase());

    if (start < 0) {
      start = null;
    }

    if (end < 0) {
      end = letters.length - 1;
    }
  } else {
    start = from;
    end = to as number;
  }

  if (start !== null) {
    // interchange start with end if start is greater than end
    if (start > end) {
      const interchanger = start;
      start = end;
      end = interchanger;
    }

    if (isString(from)) {
      step = step >= 1 ? Math.ceil(step) : 1;
      for (start; start <= end; start += step) {
        result.push(letters[start]);
      }
    } else {
      for (start; start <= end; start += step) {
        result.push(start);
      }
    }
  }

  return result;
}
