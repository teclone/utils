import * as Utils from '../src/index';

describe('Utils', function() {
    describe('.isNull(arg: any): boolean', function() {
        it(`should return true if argument is null`, function() {
            expect(Utils.isNull(null)).toBeTruthy();
        });
        it(`should return false if argument is not null`, function() {
            expect(Utils.isNull([])).toBeFalsy();
        });
    });

    describe('.isUndefined(arg: any): boolean', function() {
        it(`should return true if argument is undefined`, function() {
            expect(Utils.isUndefined(undefined)).toBeTruthy();
        });
        it(`should return false if argument is not undefined`, function() {
            expect(Utils.isUndefined(null)).toBeFalsy();
        });
    });

    describe('.isBoolean(arg: any): boolean', function() {
        it(`should return true if argument is a boolean value`, function() {
            expect(Utils.isBoolean(false)).toBeTruthy();
        });
        it(`should return false if argument is not a boolean value`, function() {
            expect(Utils.isBoolean([])).toBeFalsy();
        });
    });

    describe('.isString(arg: any): boolean', function() {
        it(`should return true if argument is a string`, function() {
            expect(Utils.isString('my string')).toBeTruthy();
        });
        it(`should return false if argument is not a string`, function() {
            expect(Utils.isString([])).toBeFalsy();
        });
    });

    describe('.isNumber(arg: any): boolean', function() {
        it('should return true if argument is of type number and it is not NaN', function() {
            expect(Utils.isNumber(22)).toBeTruthy();
        });

        it('should return false if argument is NaN or not of type number', function() {
            expect(Utils.isNumber(NaN)).toBeFalsy();
            expect(Utils.isNumber('22')).toBeFalsy();
        });
    });

    describe('isInt(arg: any): boolean', function() {
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

    describe('isNumeric(arg: any): boolean', function() {
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

    describe('.isArray(arg: any): boolean', function() {
        it('should return true if argument is an array', function() {
            expect(Utils.isArray([])).toBeTruthy();
        });

        it('should return false if argument is not an array', function() {
            expect(Utils.isArray({})).toBeFalsy();
            expect(Utils.isArray('')).toBeFalsy();
        });
    });

    describe('.isCallable(arg: any): boolean', function() {
        it('should return true if argument is a function', function() {
            expect(Utils.isCallable(name => name)).toBeTruthy();
        });

        it('should return false if argument is not a function', function() {
            expect(Utils.isCallable(new RegExp('a'))).toBeFalsy();
        });
    });

    describe('.isObject(arg: any): boolean', function() {
        it('should return true if argument is an object, but not an array, function, regex or null', function() {
            expect(Utils.isObject({})).toBeTruthy();
        });

        it('should return false if argument is not an object', function() {
            expect(Utils.isObject('')).toBeFalsy();
            expect(Utils.isObject(null)).toBeFalsy();
            expect(Utils.isObject(undefined)).toBeFalsy();
        });
    });

    describe('.isPlainObject(arg: any): boolean', function() {
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

    describe('isRegex(arg: any): boolean', function() {
        it(`should return true if argument is a regex object`, function() {
            expect(Utils.isRegex(/something/)).toBeTruthy();
            expect(Utils.isRegex(new RegExp('^\\d+$'))).toBeTruthy();
        });

        it(`should return false if argument is not a regex object`, function() {
            expect(Utils.isRegex('/something/')).toBeFalsy();
            expect(Utils.isRegex({})).toBeFalsy();
        });
    });

    describe('.isParameter(arg: any, isNullValid=true): boolean', function() {
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

    describe('.makeArray<T>(arg: T | T[], isNullValid=false): T[]', function() {
        it(`should return argument if is an array`, function() {
            const arg = ['item'];
            expect(Utils.makeArray(arg)).toBe(arg);
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

    describe('.makeObject<T>(arg: T | any): T | object', function() {
        it(`should return argument if is an object`, function() {
            const arg = {name: 'item'};
            expect(Utils.makeObject(arg)).toBe(arg);
        });

        it(`should return empty object if argument is not an object`, function() {
            expect(Utils.makeObject(null)).toEqual({});
        });
    });

    describe('.deleteProperty(key: string, target: object): boolean', function() {
        it(`should delete the given property from the target object`, function() {
            const target = {name: 'name'};
            expect(Utils.deleteProperty('name', target)).toBeTruthy();
            expect(target.name).toBeUndefined();
        });

        it(`should return false if the given property cannot be deleted because it is non
        configurable`, function() {
            const target = {};
            Object.defineProperty(target, 'name', {
                value: 'name',
                configurable: false
            });
            expect(Utils.deleteProperty('name', target)).toBeFalsy();
            expect(target['name']).toBeDefined();
        });
    });

    describe('.deleteProperties(keys: string[], target: object): boolean', function() {
        it(`should delete the given array of properties from the target object`, function() {
            const target = {name: 'name'};
            expect(Utils.deleteProperties(['name'], target)).toBeTruthy();
            expect(target.name).toBeUndefined();
        });

        it(`should return false if any of the given properties cannot be deleted because it is non
        configurable`, function() {
            const target = {age: 22};
            Object.defineProperty(target, 'name', {
                value: 'name',
                configurable: false
            });
            expect(Utils.deleteProperties(['age', 'name'], target)).toBeFalsy();
            expect(target['name']).toBeDefined();
            expect(target.age).toBeUndefined();
        });
    });

    describe('.keyNotSetOrTrue(key: string, object: object): boolean', function() {
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

    describe('.keySetAndTrue(key: string, object: object): boolean', function() {
        it(`should return true if key is set in the given object and true`, function() {
            expect(Utils.keySetAndTrue('key', {key: true})).toBeTruthy();
        });

        it(`should return false if key is not set in the given object or if key is set but
        its value is falsy`, function() {
            expect(Utils.keySetAndTrue('key', {})).toBeFalsy();
            expect(Utils.keySetAndTrue('key', {key: false})).toBeFalsy();
        });
    });

    describe('.value<T=any>(keys: string | string[], object: object, defaultValue: T = null): T', function() {
        const object = {name: 'Jack', age: 10};

        it(`should return the value for the first set key in the object`, function() {
            expect(Utils.value('name', object)).toEqual(object.name);
            expect(Utils.value(['height', 'name'], object)).toEqual(object.name);
            expect(Utils.value(['height', 'age', 'name'], object)).toEqual(object.age);
        });

        it(`should return the default value if no key is set in the object`, function() {
            expect(Utils.value('height', object)).toBeNull();
            expect(Utils.value(['height', 'unset'], object, 22)).toEqual(22);
        });
    });

    describe('.arrayValue<T=any>(keys: string | string[], object: object, defaultValue: T[] = []): T[]', function() {
        const object = {names: ['Jack', 'Jane'], ages: [10, 20, 30]};

        it(`should return the value for the first set key in the object that is an array`, function() {
            expect(Utils.arrayValue('names', object)).toEqual(object.names);
            expect(Utils.arrayValue(['heights', 'names'], object)).toEqual(object.names);
            expect(Utils.arrayValue(['heights', 'ages', 'names'], object)).toEqual(object.ages);
        });

        it(`should return the default value if no key is set in the object that is an array`, function() {
            expect(Utils.arrayValue('heights', object)).toEqual([]);
            expect(Utils.arrayValue(['heights', 'unset'], object, [22.5])).toEqual([22.5]);
        });
    });

    describe('.objectValue(keys: string | string[], object: object, defaultValue: object = {}): object', function() {
        const object = {
            settings: {notify: true, zoom: false},
            themes: ['oneUI', 'touchWiz'],
            name: 'customApp'
        };

        it(`should return the value for the first set key in the object that is an object`, function() {
            expect(Utils.objectValue('settings', object)).toEqual(object.settings);
            expect(Utils.objectValue(['themes', 'settings'], object)).toEqual(object.settings);
        });

        it(`should return the default value if no key is set in the object that is an object`, function() {
            expect(Utils.objectValue('heights', object)).toEqual({});
            expect(Utils.objectValue(['heights', 'unset'], object, object)).toEqual(object);
        });
    });

    describe(`.scopeCallback(callback: CallbackCache | Callback,
        scope: object = null, parameters: T | T[] = [])`, function() {

        it(`should return a scoped annonymous function for the given callback`, function() {
            const scope = {};
            const mockFn = jest.fn();
            mockFn.mockReturnThis();

            const scopedCallback = Utils.scopeCallback(mockFn, scope);
            expect(scopedCallback).toBeInstanceOf(Function);

            scopedCallback();
            expect(mockFn.mock.results[0].value).toStrictEqual(scope);
        });

        it(`should pass in the given arguments to the callback when executed`, function() {
            const parameter = 2;
            const mockFn = jest.fn();
            mockFn.mockReturnThis();

            const scopedCallback = Utils.scopeCallback(mockFn, null, parameter);

            scopedCallback(1);

            expect(mockFn.mock.calls[0][0]).toEqual(1);
            expect(mockFn.mock.calls[0][1]).toEqual(2);
        });

        it(`should default the scope object to null if not given, and the parameters to empty
            array`, function() {
            const mockFn = jest.fn();
            mockFn.mockReturnThis();

            const scopedCallback = Utils.scopeCallback(mockFn);
            expect(scopedCallback).toBeInstanceOf(Function);

            scopedCallback();
            expect(mockFn.mock.results[0].value).toStrictEqual(null);
            expect(mockFn.mock.calls[0].length).toEqual(0);
        });

        it(`should generate a scoped callback for the given callback cache object`, function() {
            const callbackCache: Utils.CallbackCache<jest.Mock> = {
                callback: jest.fn(),
                parameters: [1, 2],
                scope: {id: 1}
            };
            callbackCache.callback.mockReturnThis();

            const scopedCallback = Utils.scopeCallback(callbackCache);
            expect(scopedCallback).toBeInstanceOf(Function);

            scopedCallback(0);
            callbackCache.parameters = [3, 4];
            scopedCallback(0);

            expect(callbackCache.callback.mock.calls[0]).toEqual([0, 1, 2]);
            expect(callbackCache.callback.mock.calls[1]).toEqual([0, 3, 4]);
        });
    });

    describe(`.scheduleCallback(callback: Callback, time: number = 1000)`, function() {

        it(`should schedule the execution of the given callback to the given time and return a
        promise`, function() {
            expect(Utils.scheduleCallback(jest.fn())).toBeInstanceOf(Promise);

            const mockFn = jest.fn();
            return Utils.scheduleCallback(mockFn).then(() => {
                expect(mockFn.mock.calls.length).toEqual(1);
            });
        });
    });

    describe('.generateRandomDigits(length: number = 4): string', function() {
        it(`should generate random digits up to the given length`, function() {
            expect(Utils.generateRandomDigits()).toHaveLength(4);
            expect(Utils.generateRandomDigits(6)).toMatch(/^\d{6}$/);
        });
    });

    describe('.generateRandomText(length: number = 4, exemptNumerals: boolean = false): string', function() {
        it(`should generate random alphabetic and numerical characters up to the given length`, function() {
            expect(Utils.generateRandomText()).toHaveLength(4);
            expect(Utils.generateRandomText(6)).toMatch(/^[a-z0-9]{6}$/i);
        });

        it(`should not include numerical characters if second argument is true`, function() {
            expect(Utils.generateRandomText(6, true)).toMatch(/^[a-z]{6}$/i);
        });
    });

    describe('.range(from: number | string, to: number | string, step: number = 1): number[] | string[]', function() {

        const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const upperCaseAlphabets = alphabets.map(alphabet => alphabet.toUpperCase());

        it(`should create a range of numbers if passed in numeric values starting from the given
        from argument and stopping at the given end argument, stepping ahead according to the
        given step argument`, function() {
            expect(Utils.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            expect(Utils.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
        });

        it(`should default step argument to 1 if it is less than or equal to zero`, function() {
            expect(Utils.range(0, 5, 0)).toEqual([0, 1, 2, 3, 4, 5]);
            expect(Utils.range(0, 5, -2)).toEqual([0, 1, 2, 3, 4, 5]);
        });

        it(`should interchange from with to if from argument is greater than to argument`, function() {
            expect(Utils.range(5, 0)).toEqual([0, 1, 2, 3, 4, 5]);
        });

        it(`should create a range of alphabets if passed in alphabet values starting from the given
        from argument and stopping at the given end argument, stepping ahead according to the
        given step argument`, function() {
            expect(Utils.range('a', 'z')).toEqual(alphabets);

            expect(Utils.range('a', 'z', 2)).toEqual(
                alphabets.filter((char, index) => index % 2 === 0)
            );
        });

        it(`should return alphabets in upper case if from argument is an upperCase letter`, function() {
            expect(Utils.range('A', 'Z')).toEqual(upperCaseAlphabets);
        });

        it(`should default ceil step value to an integer`, function() {
            expect(Utils.range('A', 'Z', 0.25)).toEqual(upperCaseAlphabets);

            expect(Utils.range('A', 'Z', 2.5)).toEqual(
                upperCaseAlphabets.filter((char, index) => index % 3 === 0)
            );
        });

        it(`should return empty array if from argument is a string but not a letter alphabet`, function() {
            expect(Utils.range(',', 'z')).toEqual([]);
        });

        it(`should default to argument to z if it is not an alphabet`, function() {
            expect(Utils.range('a', ',')).toEqual(alphabets);
        });
    });

    describe('.clone(target: object, ...objects: object[])', function() {
        const headers = {'Content-Type': 'text/html'};
        const heights = [22, 33, 34, 37];

        it(`should copy all the objects into the target object without creating refrences`, function() {
            const copy = Utils.copy({}, {headers, heights, name: 'harrison'});
            expect(copy.headers).toEqual(headers);
            expect(copy.headers).not.toBe(headers);

            expect(copy.heights).toEqual(heights);
            expect(copy.name).toEqual('harrison');
        });

        it(`should keep existing properties and override when necessary`, function() {
            const colors = {white: '#fff', grey: '#777', faint: '#999'};

            const copy = Utils.copy({colors: {white: '#000', red: 'red'}}, {colors});
            expect(copy.colors.white).toEqual('#fff');
            expect(copy.colors.red).toEqual('red');
        });
    });

    describe('.expandProperty(target: object, key: string, value: any, delimiter: string = ".")', function() {

        it(`should expand the given key into an object property`, function() {
            const target = Utils.expandProperty({}, 'headers.contentType', 'text/html');

            expect(target.headers.contentType).toEqual('text/html');
        });
    });

    describe('.camelCase(text: string, delimiter: string | RegExp = /[-_]/): string', function() {
        it(`should turn the given text string into camel casing using the given delimiter`, function() {
            expect(Utils.camelCase('my:string', ':')).toEqual('myString');
        });

        it(`should default the delimiter argument to /[_-]/ if not given`, function() {
            expect(Utils.camelCase('my-second_string')).toEqual('mySecondString');
        });
    });

    describe('.padLeft(target: string | number, length:number = 4, padWith: string | number = 0): string', function() {

        it(`should pad the given target to the left with the given padWith value up till the
        target length meets the given length`, function() {
            expect(Utils.padLeft(12, 6, 0)).toEqual('000012');
            expect(Utils.padLeft(12, 3, '-')).toEqual('-12');
            expect(Utils.padLeft(12, 2, '-')).toEqual('12');
        });

        it(`should default the length to 4 and the padWith argument to 0 if not given`, function() {
            expect(Utils.padLeft(12)).toEqual('0012');
        });
    });

    describe('.padRight(target: string | number, length:number = 4, padWith: string | number = 0): string', function() {

        it(`should pad the given target to the right with the given padWith value up till the
        target length meets the given length`, function() {
            expect(Utils.padRight(12, 6, 0)).toEqual('120000');
            expect(Utils.padRight(12, 3, '-')).toEqual('12-');
            expect(Utils.padRight(12, 2, '-')).toEqual('12');
        });

        it(`should default the length to 4 and the padWith argument to 0 if not given`, function() {
            expect(Utils.padRight(12)).toEqual('1200');
        });
    });
});