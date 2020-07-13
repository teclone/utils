export const convertToUnit = (
  units: string[],
  value: number,
  maximumFractionDigits: number,
  defaultUnit: string,
) => {
  const snapPoints = [1000000000000, 1000000000, 1000000, 1000];
  const length = snapPoints.length;
  let i = -1;

  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits });
  while (++i < length) {
    const snapPoint = snapPoints[i];
    const unit = units[i];

    if (value >= snapPoint) {
      return formatter.format(value / snapPoint) + unit;
    }
  }
  return value + defaultUnit;
};
