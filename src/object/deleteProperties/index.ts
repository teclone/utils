/**
 * it deletes given property from the given object if it exists
 * returns true if all properties where handled accurately, also returns true if any of
 * the properties could not be deleted.
 */
export const deleteProperties = (
  target: object,
  ...keys: string[]
): boolean => {
  let succeeds = true;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      delete target[key];
    } catch (ex) {
      succeeds = false;
    }
  }
  return succeeds;
};
