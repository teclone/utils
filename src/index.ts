/**
 * tests if argument is a string
 */
export const isString = (arg: any): arg is string => {
    return typeof arg === 'string';
}