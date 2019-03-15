
const toString = Object.prototype.toString;

/**
 * tests if argument is a string
 */
export const isString = (arg: any): arg is string => {
    return typeof arg === 'string';
};

/**
 * tests if argument is a number
 */
export const isNumber = (arg: any): arg is number => {
    return typeof arg === 'number' && !isNaN(arg);
};

/**
 * test if argument starts with integer, whether positive or negative
 */
export const isInt = (arg: any): arg is number => {
    return /^[-+]?\d+/.test(arg);
};

/**
 * test if argument starts with number(integer or float), whether positive or negative
 */
export const isNumeric = (arg: any): arg is number => {
    return /^[-+.]?\d+/.test(arg);
};

/**
 * test if argument is an array
 */
export const isArray = (arg: any): arg is Array<any> => {
    return toString.call(arg) === '[object Array]' || arg instanceof Array;
};

/**
 * test if argument is a function
 */
export const isCallable = (arg: any): arg is Function => {
    return (toString.call(arg) === '[object Function]' || arg instanceof Function)
        && !(arg instanceof RegExp);
};

/**
 * test if argument is a regular expressions
 */
export const isRegex = (arg: any): arg is RegExp => {
    return toString.call(arg) === '[object RegExp]' && arg instanceof RegExp;
};

/**
 * test if argument is a javascript object
 */
export const isObject = (arg: any): arg is object => {
    return typeof arg === 'object' && arg !== null;
};

/**
 * test if argument is a plain javascript object
 */
export const isPlainObject = (arg: any): arg is object => {
    if (isObject(arg)) {
        const proto = Object.getPrototypeOf(arg);
        return proto === null || proto === Object.getPrototypeOf({});
    }
    return false;
};

/**
 * test if argument is a valid method parameter. by default, all types are valid parameters
 * except undefined.
 */
export const isParameter = (arg: any, isNullValid: boolean = true) => {
    if (typeof arg === 'undefined')
        return false;

    if (arg === null)
        return isNullValid;

    return true;
};