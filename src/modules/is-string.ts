/**
 * tests if argument is a string
 */
export default (arg: any): arg is string => {
    return typeof arg === 'string';
}