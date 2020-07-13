/**
 * strips out beginning and ending forward or backward slashes from the given path
 * @param path the path to work on
 */
export const stripSlashes = (path: string): string => {
  return path.replace(/^[\\/]+/, '').replace(/[\\/]+$/, '');
};
