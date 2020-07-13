/**
 * expands the given unit based size to full numeric value
 * @param size - numeric or string unit-based size
 */
export const expandToNumeric = (size: number | string): number => {
  size = size.toString();
  if (/^\.\d+$/.test(size) || /^\d+(?:\.\d*)?$/.test(size)) {
    return Number.parseFloat(size);
  } else if (/^(\.\d+)([a-z]+)$/i.test(size) || /^(\d+(?:\.\d*)?)([a-z]+)$/i.test(size)) {
    let numeric = Number.parseFloat(RegExp.$1);
    const unit = RegExp.$2.toLowerCase();

    switch (unit) {
      case 'k':
        return numeric * 1000;
      case 'm':
      case 'mb':
        return numeric * 1000000;
      case 'g':
      case 'gb':
        return numeric * 1000000000;
      case 't':
      case 'tb':
        return numeric * 1000000000000;
    }
  } else {
    return 0;
  }
};
