import * as Utils from '../src/index';

describe('Utils', function() {
    describe('.isString(arg)', function() {
        it(`should return true if argument is a string`, function() {
            expect(Utils.isString('my string')).toBeTruthy();
        });
        it(`should return false if argument is not a string`, function() {
            expect(Utils.isString([])).toBeFalsy();
        });
    });

    describe('.isNumber(arg)', function() {
        it('should return true if argument is of type number and it is not NaN', function() {
            expect(Utils.isNumber(22)).toBeTruthy();
        });

        it('should return false if argument is NaN or not of type number', function() {
            expect(Utils.isNumber(NaN)).toBeFalsy();
            expect(Utils.isNumber('22')).toBeFalsy();
        });
    });

    describe('isInt(arg)', function() {
        it(`should return true if argument is an int or can be cast to an int`, function() {
            expect(Utils.isInt('042')).toBeTruthy();
            expect(Utils.isInt('+33')).toBeTruthy();
            expect(Utils.isInt('-004aaaa')).toBeTruthy();
        });

        it(`should return false if argument is not an int or can't be cast to an int`, function() {
            expect(Utils.isInt('-+000.4eeeee')).toBeFalsy();
            expect(Utils.isInt('.eeeee')).toBeFalsy();
            expect(Utils.isInt('add.4eeeee')).toBeFalsy();
        });
    });

    describe('isNumeric(arg)', function() {
        it(`should return true if argument is a numeric value`, function() {
            expect(Utils.isNumeric('000.4eeeee')).toBeTruthy();
            expect(Utils.isNumeric('.0004eeeee')).toBeTruthy();
            expect(Utils.isNumeric('+33.4eeeee')).toBeTruthy();
            expect(Utils.isNumeric('-33.4eeeee')).toBeTruthy();
        });

        it(`should return false if argument is not a numeric value`, function() {
            expect(Utils.isNumeric('-+000.4eeeee')).toBeFalsy();
            expect(Utils.isNumeric('.eeeee')).toBeFalsy();
            expect(Utils.isNumeric('add.4eeeee')).toBeFalsy();
        });
    });

    describe('.isArray(arg)', function() {
        it('should return true if argument is an array', function() {
            expect(Utils.isArray([])).toBeTruthy();
        });

        it('should return false if argument is not an array', function() {
            expect(Utils.isArray({})).toBeFalsy();
            expect(Utils.isArray('')).toBeFalsy();
        });
    });

    describe('.isCallable(arg)', function() {
        it('should return true if argument is a function', function() {
            expect(Utils.isCallable(name => name)).toBeTruthy();
        });

        it('should return false if argument is not a function', function() {
            expect(Utils.isCallable(new RegExp('a'))).toBeFalsy();
        });
    });

    describe('.isObject(arg)', function() {
        it('should return true if argument is an object', function() {
            expect(Utils.isObject({})).toBeTruthy();
            expect(Utils.isObject([])).toBeTruthy();
        });

        it('should return false if argument is not an object', function() {
            expect(Utils.isObject('')).toBeFalsy();
            expect(Utils.isObject(null)).toBeFalsy();
            expect(Utils.isObject(undefined)).toBeFalsy();
        });
    });

    describe('.isPlainObject(arg)', function() {
        it('should return true if argument is a plain javascript object', function() {
            expect(Utils.isPlainObject({})).toBeTruthy();
            expect(Utils.isPlainObject(Object.create(null))).toBeTruthy();
        });

        it('should return false if argument is not a plain object', function() {
            expect(Utils.isPlainObject([])).toBeFalsy();
            expect(Utils.isPlainObject(this)).toBeFalsy();
            expect(Utils.isPlainObject('')).toBeFalsy();
        });
    });

    describe('isRegex(arg)', function() {
        it(`should return true if argument is a regex object`, function() {
            expect(Utils.isRegex(/something/)).toBeTruthy();
            expect(Utils.isRegex(new RegExp('^\\d+$'))).toBeTruthy();
        });

        it(`should return false if argument is not a regex object`, function() {
            expect(Utils.isRegex('/something/')).toBeFalsy();
            expect(Utils.isRegex({})).toBeFalsy();
        });
    });

    describe('.isParameter(arg, isNullValid=true)', function() {
        it('should return true if argument is a valid function parameter', function() {
            expect(Utils.isParameter(3.2)).toBeTruthy();
        });

        it('should return false if argument is not a valid function parameter.', function() {
            expect(Utils.isParameter(undefined)).toBeFalsy();
        });

        it('should accept a second boolean argument indicating if null arguments should be taken as valid', function() {
            expect(Utils.isParameter(null, false)).toBeFalsy();
            expect(Utils.isParameter(null)).toBeTruthy();
        });
    });

    describe('.makeArray(arg, isNullValid=false)', function() {
        it(`should return argument if is an array`, function() {
            const arg = ['item'];
            expect(Utils.makeArray(arg)).toStrictEqual(arg);
        });

        it(`should put argument into an array and return`, function() {
            const arg = 'item';
            expect(Utils.makeArray(arg)).toEqual([arg]);
        });

        it(`should return empty array if argument is undefined or null`, function() {
            expect(Utils.makeArray(undefined)).toEqual([]);
            expect(Utils.makeArray(null)).toEqual([]);
        });

        it(`should take null as valid argument if isNullValid parameter is set to true`, function() {
            expect(Utils.makeArray(null, true)).toEqual([null]);
        });
    });

    describe('.keyNotSetOrTrue(key, object)', function() {
        it(`should return true if key is not set in the given object`, function() {
            expect(Utils.keyNotSetOrTrue('key', {})).toBeTruthy();
        });

        it(`should return true if key is set in the given object and its value is truthy`, function() {
            expect(Utils.keyNotSetOrTrue('key', {key: 1})).toBeTruthy();
        });

        it(`should return false if key is set in the given object and its value is falsy`, function() {
            expect(Utils.keyNotSetOrTrue('key', {key: 0})).toBeFalsy();
        });
    });

    describe('.keySetAndTrue(key, object)', function() {
        it(`should return true if key is set in the given object and true`, function() {
            expect(Utils.keySetAndTrue('key', {key: true})).toBeTruthy();
        });

        it(`should return false if key is not set in the given object or if key is set but
        its value is falsy`, function() {
            expect(Utils.keySetAndTrue('key', {})).toBeFalsy();
            expect(Utils.keySetAndTrue('key', {key: false})).toBeFalsy();
        });
    });
});