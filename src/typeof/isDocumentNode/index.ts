/**
 * detects if argument is a Document
 */
export const isDocumentNode = (arg: any): arg is Document => {
  return arg?.nodeType === 9;
};
