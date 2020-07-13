/**
 * pads the given target text or number with the pad with value until the target length meets
 * the given length
 */
export const padRight = (
  target: string | number,
  length = 4,
  padWith: string | number = 0,
): string => {
  target = target.toString();
  padWith = padWith.toString();

  let padTimes = length - target.length;
  while (padTimes-- > 0) {
    target += padWith;
  }

  return target;
};
