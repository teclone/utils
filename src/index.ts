const toString = Object.prototype.toString;

const alphabets = 'abcdefghijklmnopqrstuvwxyz';

const digits = '0123456789';

export interface Callback {
    (...args): any;
    [propName: string]: any;
}

export interface CallbackCache <C extends Function = Callback, P = any> {
    callback: C;
    parameters?: P | P[],
    scope?: object;
    [propName: string]: any;
}

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
export const isArray = <T>(arg: T | T[]): arg is Array<T> => {
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
export const isObject = <T=object>(arg: any): arg is T => {
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

/**
 * puts argument into an array if it is not an array,
 */
export const makeArray = <T>(arg: T[] | T, isNullValid: boolean = false): Array<T> => {
    if (isArray(arg))
        return arg;

    return isParameter(arg, isNullValid)? [arg] : [];
};

function makeObject<T extends object>(arg: T): T;
function makeObject(arg: any): object;

/**
 * returns argument if it is an object, otherwise, returns an empty plain object
 */
function makeObject<T>(arg: T | any): T | object {
    if (isObject(arg))
        return arg;

    return {};
};

/**
 * returns true if key is not set in the given object or key is set and its value is truthy
 */
export const keyNotSetOrTrue = (key: string, object: object): boolean => {
    return typeof object[key] === 'undefined' || !!object[key];
};

/**
 * returns true if key is set in the given object and its value is truthy
 */
export const keySetAndTrue = (key: string, object: object): boolean => {
    return typeof object[key] !== 'undefined' && !!object[key];
};

/**
 * returns the value for the first key that exists in the object otherwise,
 * it returns the default value
 */
export const value = <T = any>(keys: string | string[], object: object, defaultValue: T = null): T => {
    keys = makeArray(keys);
    for (const key of keys) {
        if (typeof object[key] !== 'undefined')
            return object[key];
    }
    return defaultValue;
};

/**
 * returns the value for the first key that exists in the object whose value is an array otherwise,
 * it returns the default value
 */
export const arrayValue = <T = any>(keys: string | string[], object: object, defaultValue: T[] = []): T[] => {
    keys = makeArray(keys);
    for (const key of keys) {
        if (isArray(object[key]))
            return object[key];
    }
    return defaultValue;
};

/**
 * returns the value for the first key that exists in the object whose value is an object otherwise,
 * it returns the default value
 */
export const objectValue = (keys: string | string[], object: object, defaultValue: object = {}): object => {
    keys = makeArray(keys);
    for (const key of keys) {
        if (isObject(object[key]))
            return object[key];
    }
    return defaultValue;
};

/**
 * scope callback using a cache object
 * @param callbackCache
 */
export function scopeCallback(callbackCache: CallbackCache): (...args) => any;

/**
 * scope callback using the given scope and parameters
 */
export function scopeCallback<T=any>(callback: Callback, scope?: object,
    parameters?: T | T[]): (...args) => any;

/**
 * generates a callback function, scoping the execution with optional extra parameters
 */
export function scopeCallback<T=any>(callback: Callback | CallbackCache,
    scope: object = null, parameters: T | T[] = []) {

    if (isObject<CallbackCache>(callback)) {

        return (...args) => {
            parameters = makeArray(callback.parameters);
            scope = value('scope', callback, null);

            try {
                return callback.callback.apply(scope, [...args, ...parameters]);
            }
            catch(ex){
                // do nothing
            }
        };
    }
    else {
        parameters = makeArray(parameters);
        return (...args) => {
            try {
                return callback.apply(scope, [...args, ... (parameters as T[])]);
            }
            catch(ex){
                // do nothing
            }
        };
    }
};

/**
 * schedules the execution of a scoped callback to a given time
 */
export const scheduleCallback = (scopedCallback: Callback, time: number = 1000) => {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve(scopedCallback());
        }, time);
    });
};

/**
 * generates random digit of given character length
 */
export const generateRandomDigits = (length: number = 4): string => {

    const result: string[] = [];

    while (length--) {
        result.push(digits.charAt(Math.floor(Math.random() * digits.length)));
    }
    return result.join('');
};

/**
 * generates a random text of given character length
 */
export const generateRandomText = (length: number = 4, exemptNumerals: boolean = false): string => {
    const letters = alphabets + alphabets.toUpperCase();

    const chars = exemptNumerals? letters : letters + digits;
    const result: string[] = [];

    while (length--) {
        result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return result.join('');
};

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
export function range(from: string | number, to: string | number,
    step: number = 1): number[] | string[] {

    const result = [];
    const letters = from.toString().toLowerCase() !== from? alphabets.toUpperCase() : alphabets;
    step = step <= 0? 1 : step;

    //resolve start and end points
    let start: number = null;
    let end: number = null;

    if (isString(from)) {
        start = alphabets.indexOf(from.toLowerCase());
        end = alphabets.indexOf((to as string).toLowerCase());

        if (start < 0)
            start = null;

        if (end < 0)
            end = letters.length - 1;
    }
    else {
        start = from;
        end = to as number;
    }

    if (start !== null) {
        //interchange start with end if start is greater than end
        if (start > end) {
            const interchanger = start;
            start = end;
            end = interchanger;
        }

        if (isString(from)) {
            step = step >= 1? Math.ceil(step) : 1;
            for(start; start <= end; start += step)
                result.push(letters[start]);
        }
        else {
            for(start; start <= end; start += step)
                result.push(start);
        }
    }

    return result;
};


/**
 * copies the objects into the target object, without creating references, unlike Object.assign
 */
export const copy = <T extends object, O extends object>(target: T, ...objects: O[]): T & {
    [P in keyof O] : O[P]
} => {

    const cloneEach = (dest: any, value: any) => {

        if (isArray(value)) {
            dest = makeArray(dest);
            value.forEach((current, index) => {
                dest[index] = cloneEach(null, current);
            });
            return dest;
        }

        if (isCallable(value) || isRegex(value) || !isObject(value))
            return value;

        dest = makeObject(dest);
        for (const [key, current] of Object.entries(value)) {
            dest[key] = cloneEach(dest[key], current);
        }
        return dest;
    };

    objects.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
            target[key] = cloneEach(target[key], value);
        }
    });

    return target as T & {[P in keyof O] : O[P]};
};

/**
 * expands the string key and turns it into an object property
 */
export const expandProperty = <T extends object>(target: T, key: string, value: any, delimiter: string = '.'): T & {
    [propName: string]: any
} => {
    const keys = key.split(delimiter);
    const lastKey = keys.pop();

    const lastObject: object = keys.reduce((current, key) => {
        current[key] = makeObject(current[key]);
        return current[key];
    }, target);

    lastObject[lastKey] = value;

    return target;
};

/**
 * converts text to camel like casing
 */
export const camelCase = (text: string, delimiter: string | RegExp = /[-_]/): string => {
    return text.split(delimiter).map((token, index) => {
        return index === 0? token : token.charAt(0).toUpperCase() + token.substring(1);
    }).join('');
};