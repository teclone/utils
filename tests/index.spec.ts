import * as Utils from '../src/index';

describe('Utils', function () {
  describe('.isNull(arg: any): arg is null', function () {
    it(`should return true if argument is null`, function () {
      expect(Utils.isNull(null)).toBeTruthy();
    });
    it(`should return false if argument is not null`, function () {
      expect(Utils.isNull([])).toBeFalsy();
    });
  });

  describe('.isUndefined(arg: any): arg is undefined', function () {
    it(`should return true if argument is undefined`, function () {
      expect(Utils.isUndefined(undefined)).toBeTruthy();
    });
    it(`should return false if argument is not undefined`, function () {
      expect(Utils.isUndefined(null)).toBeFalsy();
    });
  });

  describe('.isBoolean(arg: any): arg is boolean', function () {
    it(`should return true if argument is a boolean value`, function () {
      expect(Utils.isBoolean(false)).toBeTruthy();
    });
    it(`should return false if argument is not a boolean value`, function () {
      expect(Utils.isBoolean([])).toBeFalsy();
    });
  });

  describe('.isNumber(arg: any): arg is number', function () {
    it('should return true if argument is of type number and it is not NaN', function () {
      expect(Utils.isNumber(22)).toBeTruthy();
    });

    it('should return false if argument is NaN or not of type number', function () {
      expect(Utils.isNumber(NaN)).toBeFalsy();
      expect(Utils.isNumber('22')).toBeFalsy();
    });
  });

  describe('.isString(arg: any): arg is string', function () {
    it(`should return true if argument is a string`, function () {
      expect(Utils.isString('my string')).toBeTruthy();
    });
    it(`should return false if argument is not a string`, function () {
      expect(Utils.isString([])).toBeFalsy();
    });
  });

  describe('isInt(arg: any): arg is string', function () {
    it(`should return true if argument is an int or can be cast to an int`, function () {
      expect(Utils.isInt('042')).toBeTruthy();
      expect(Utils.isInt('+33')).toBeTruthy();
      expect(Utils.isInt('-004aaaa')).toBeTruthy();
    });

    it(`should return false if argument is not an int or can't be cast to an int`, function () {
      expect(Utils.isInt('-+000.4eeeee')).toBeFalsy();
      expect(Utils.isInt('.eeeee')).toBeFalsy();
      expect(Utils.isInt('add.4eeeee')).toBeFalsy();
    });
  });

  describe('isNumeric(arg: any): arg is string', function () {
    it(`should return true if argument is a numeric value`, function () {
      expect(Utils.isNumeric('000.4eeeee')).toBeTruthy();
      expect(Utils.isNumeric('.0004eeeee')).toBeTruthy();
      expect(Utils.isNumeric('+33.4eeeee')).toBeTruthy();
      expect(Utils.isNumeric('-33.4eeeee')).toBeTruthy();
    });

    it(`should return false if argument is not a numeric value`, function () {
      expect(Utils.isNumeric('-+000.4eeeee')).toBeFalsy();
      expect(Utils.isNumeric('.eeeee')).toBeFalsy();
      expect(Utils.isNumeric('add.4eeeee')).toBeFalsy();
    });
  });

  describe('.isArray<T>(arg: T | T[]): arg is Array<T>', function () {
    it('should return true if argument is an array', function () {
      expect(Utils.isArray([])).toBeTruthy();
    });

    it('should return false if argument is not an array', function () {
      expect(Utils.isArray({})).toBeFalsy();
      expect(Utils.isArray('')).toBeFalsy();
    });
  });

  describe('.isCallable(arg: any): arg is callable', function () {
    it('should return true if argument is a function', function () {
      expect(Utils.isCallable((name) => name)).toBeTruthy();
    });

    it('should return false if argument is not a function', function () {
      expect(Utils.isCallable(new RegExp('a'))).toBeFalsy();
    });
  });

  describe('.isObject<T=object>(arg: any): arg is T', function () {
    it('should return true if argument is an object, but not an array, function, regex or null', function () {
      expect(Utils.isObject({})).toBeTruthy();
    });

    it('should return false if argument is not an object', function () {
      expect(Utils.isObject('')).toBeFalsy();
      expect(Utils.isObject(null)).toBeFalsy();
      expect(Utils.isObject(undefined)).toBeFalsy();
    });
  });

  describe('.isPlainObject(arg: any): boolean', function () {
    it('should return true if argument is a plain javascript object', function () {
      expect(Utils.isPlainObject({})).toBeTruthy();
      expect(Utils.isPlainObject(Object.create(null))).toBeTruthy();
    });

    it('should return false if argument is not a plain object', function () {
      expect(Utils.isPlainObject([])).toBeFalsy();
      expect(Utils.isPlainObject(this)).toBeFalsy();
      expect(Utils.isPlainObject('')).toBeFalsy();
    });
  });

  describe('isRegex(arg: any): arg is RegExp', function () {
    it(`should return true if argument is a regex object`, function () {
      expect(Utils.isRegex(/something/)).toBeTruthy();
      expect(Utils.isRegex(new RegExp('^\\d+$'))).toBeTruthy();
    });

    it(`should return false if argument is not a regex object`, function () {
      expect(Utils.isRegex('/something/')).toBeFalsy();
      expect(Utils.isRegex({})).toBeFalsy();
    });
  });

  describe('.isParameter(arg: any, isNullable=true): boolean', function () {
    it('should return true if argument is a valid function parameter', function () {
      expect(Utils.isParameter(3.2)).toBeTruthy();
    });

    it('should return false if argument is not a valid function parameter.', function () {
      expect(Utils.isParameter(undefined)).toBeFalsy();
    });

    it('should accept a second boolean argument indicating if null arguments should be taken as valid', function () {
      expect(Utils.isParameter(null, false)).toBeFalsy();
      expect(Utils.isParameter(null)).toBeTruthy();
    });
  });

  describe('.makeArray<T>(arg: T | T[], isNullable=false): T[]', function () {
    it(`should return argument if is an array`, function () {
      const arg = ['item'];
      expect(Utils.makeArray(arg)).toBe(arg);
    });

    it(`should put argument into an array and return`, function () {
      const arg = 'item';
      expect(Utils.makeArray(arg)).toEqual([arg]);
    });

    it(`should return empty array if argument is undefined or null`, function () {
      expect(Utils.makeArray(undefined)).toEqual([]);
      expect(Utils.makeArray(null)).toEqual([]);
    });

    it(`should take null as valid argument if isNullable parameter is set to true`, function () {
      expect(Utils.makeArray(null, true)).toEqual([null]);
    });
  });

  describe('.fillArray<T>(arg: T[], length: number, value?: T): T[]', function () {
    it(`should fill the array to the given length using the given value`, function () {
      const array = [0];
      const newArray = Utils.fillArray(array, 4, 1);
      expect(newArray.length).toEqual(4);
      expect(newArray[1]).toEqual(1);
    });

    it(`should fill the array to the given length using the last element in the array if the value is undefined`, function () {
      const array = [1];
      const newArray = Utils.fillArray(array, 4);
      expect(newArray.length).toEqual(4);
      expect(newArray[1]).toEqual(1);
    });

    it(`should do nothing, returning the array if the array length is equal to or greater the given length`, function () {
      const array = [1];
      const newArray = Utils.fillArray(array, 1);
      expect(newArray.length).toEqual(1);
    });

    it(`should fill the array with undefined, if array is empty and no value is given`, function () {
      const array = [];
      const newArray = Utils.fillArray(array, 1);
      expect(newArray.length).toEqual(1);
      expect(newArray[0]).toEqual(undefined);
    });
  });

  describe('.makeObject<T>(arg: T | any): T | object', function () {
    it(`should return argument if is an object`, function () {
      const arg = { name: 'item' };
      expect(Utils.makeObject(arg)).toBe(arg);
    });

    it(`should return empty object if argument is not an object`, function () {
      expect(Utils.makeObject(null)).toEqual({});
    });
  });

  describe(`.isTypeof<T extends O, O extends object = any>(target: O, props: string | string[]): target is T`, function () {
    it(`should assert that target is of type T if all the given props are defined in the
            target object`, function () {
      expect(Utils.isTypeOf<Array<number>>([], 'length')).toEqual(true);
    });

    it(`should assert that target is not of type T if any of the given props is not defined in
            the target object`, function () {
      expect(Utils.isTypeOf<Array<number>>([], 'len')).toEqual(false);
    });
  });

  describe('.deleteProperties(target: object, ...keys: string[]): boolean', function () {
    it(`should delete the given array of properties from the target object`, function () {
      const target = { name: 'name' };
      expect(Utils.deleteProperties(target, 'name')).toBeTruthy();
      expect(target.name).toBeUndefined();
    });

    it(`should return false if any of the given properties cannot be deleted because it is non
        configurable`, function () {
      const target = { age: 22 };
      Object.defineProperty(target, 'name', {
        value: 'name',
        configurable: false,
      });
      expect(Utils.deleteProperties(target, 'age', 'name')).toBeFalsy();
      expect(target['name']).toBeDefined();
      expect(target.age).toBeUndefined();
    });
  });

  describe('.keyNotSetOrTrue(object: object, key: string,): boolean', function () {
    it(`should return true if key is not set in the given object`, function () {
      expect(Utils.keyNotSetOrTrue({}, 'key')).toBeTruthy();
    });

    it(`should return true if key is set in the given object and its value is truthy`, function () {
      expect(Utils.keyNotSetOrTrue({ key: 1 }, 'key')).toBeTruthy();
    });

    it(`should return false if key is set in the given object and its value is falsy`, function () {
      expect(Utils.keyNotSetOrTrue({ key: 0 }, 'key')).toBeFalsy();
    });
  });

  describe('.keySetAndTrue(object: object, key: string): boolean', function () {
    it(`should return true if key is set in the given object and true`, function () {
      expect(Utils.keySetAndTrue({ key: true }, 'key')).toBeTruthy();
    });

    it(`should return false if key is not set in the given object or if key is set but
        its value is falsy`, function () {
      expect(Utils.keySetAndTrue({}, 'key')).toBeFalsy();
      expect(Utils.keySetAndTrue({ key: false }, 'key')).toBeFalsy();
    });
  });

  describe('.pickValue<T=any>(object: object, keys: string | string[], defaultValue: T = null): T', function () {
    const object = { name: 'Jack', age: 10 };

    it(`should return the value for the first set key in the object`, function () {
      expect(Utils.pickValue(object, 'name')).toEqual(object.name);
      expect(Utils.pickValue(object, ['height', 'name'])).toEqual(object.name);
      expect(Utils.pickValue(object, ['height', 'age', 'name'])).toEqual(
        object.age
      );
    });

    it(`should capture any error that occurs while trying the to access value`, function () {
      const proxy = new Proxy(object, {
        get() {
          throw new Error('you cant read from this object');
        },
      });
      expect(Utils.pickValue(proxy, 'name')).toBeUndefined();
    });

    it(`should return the default value if no key is set in the object`, function () {
      expect(Utils.pickValue(object, 'height')).toBeUndefined();
      expect(Utils.pickValue(object, ['height', 'unset'], 22)).toEqual(22);
    });
  });

  describe('.pickArray<T=any>(object: object, keys: string | string[], defaultValue: T[] = []): T[]', function () {
    const object = { names: ['Jack', 'Jane'], ages: [10, 20, 30] };

    it(`should return the value for the first set key in the object that is an array`, function () {
      expect(Utils.pickArray(object, 'names')).toEqual(object.names);
      expect(Utils.pickArray(object, ['heights', 'names'])).toEqual(
        object.names
      );
      expect(Utils.pickArray(object, ['heights', 'ages', 'names'])).toEqual(
        object.ages
      );
    });

    it(`should return the default value if no key is set in the object that is an array`, function () {
      expect(Utils.pickArray(object, 'heights')).toEqual([]);
      expect(Utils.pickArray(object, ['heights', 'unset'], [22.5])).toEqual([
        22.5,
      ]);
    });
  });

  describe('.pickObject( object: object, keys: string | string[], defaultValue: object = {}): object', function () {
    const object = {
      settings: { notify: true, zoom: false },
      themes: ['oneUI', 'touchWiz'],
      name: 'customApp',
    };

    it(`should return the value for the first set key in the object that is an object`, function () {
      expect(Utils.pickObject(object, 'settings', object)).toEqual(
        object.settings
      );
      expect(Utils.pickObject(object, ['themes', 'settings'], object)).toEqual(
        object.settings
      );
    });

    it(`should return the default value if no key is set in the object that is an object`, function () {
      expect(Utils.pickObject(object, 'heights')).toEqual({});
      expect(Utils.pickObject(object, ['heights', 'unset'], object)).toEqual(
        object
      );
    });
  });

  describe(`.scopeCallback(callback: CallbackCache | Callback,
        scope: object = null, parameters: T | T[] = [])`, function () {
    it(`should return a scoped annonymous function for the given callback`, function () {
      const scope = {};
      const mockFn = jest.fn();
      mockFn.mockReturnThis();

      const scopedCallback = Utils.scopeCallback(mockFn, scope);
      expect(scopedCallback).toBeInstanceOf(Function);

      scopedCallback();
      expect(mockFn.mock.results[0].value).toStrictEqual(scope);
    });

    it(`should pass in the given arguments to the callback when executed`, function () {
      const parameter = 2;
      const mockFn = jest.fn();
      mockFn.mockReturnThis();

      const scopedCallback = Utils.scopeCallback(mockFn, null, parameter);

      scopedCallback(1);

      expect(mockFn.mock.calls[0][0]).toEqual(1);
      expect(mockFn.mock.calls[0][1]).toEqual(2);
    });

    it(`should default the scope object to null if not given, and the parameters to empty
            array`, function () {
      const mockFn = jest.fn();
      mockFn.mockReturnThis();

      const scopedCallback = Utils.scopeCallback(mockFn);
      expect(scopedCallback).toBeInstanceOf(Function);

      scopedCallback();
      expect(mockFn.mock.results[0].value).toStrictEqual(null);
      expect(mockFn.mock.calls[0].length).toEqual(0);
    });

    it(`should generate a scoped callback for the given callback cache object`, function () {
      const callbackCache: Utils.CallbackCache<jest.Mock> = {
        callback: jest.fn(),
        parameters: [1, 2],
        scope: { id: 1 },
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

  describe(`.scheduleCallback(callback: Callback, time: number = 1000)`, function () {
    it(`should schedule the execution of the given callback to the given time and return a
        promise`, function () {
      expect(Utils.scheduleCallback(jest.fn())).toBeInstanceOf(Promise);

      const mockFn = jest.fn();
      return Utils.scheduleCallback(mockFn).then(() => {
        expect(mockFn.mock.calls.length).toEqual(1);
      });
    });
  });

  describe('.generateRandomNumber(min: number, max: number)', function () {
    it(`should generate a random number between the given min and max value inclusive`, function () {
      const result = Utils.generateRandomNumber(0, 1);
      expect(result).toBeLessThanOrEqual(1);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('.generateRandomDigits(length: number = 4): string', function () {
    it(`should generate random digits up to the given length`, function () {
      expect(Utils.generateRandomDigits()).toHaveLength(4);
      expect(Utils.generateRandomDigits(6)).toMatch(/^\d{6}$/);
    });
  });

  describe('.generateRandomText(length: number = 4, exemptNumerals: boolean = false): string', function () {
    it(`should generate random alphabetic and numerical characters up to the given length`, function () {
      expect(Utils.generateRandomText()).toHaveLength(4);
      expect(Utils.generateRandomText(6)).toMatch(/^[a-z0-9]{6}$/i);
    });

    it(`should not include numerical characters if second argument is true`, function () {
      expect(Utils.generateRandomText(6, true)).toMatch(/^[a-z]{6}$/i);
    });
  });

  describe('.range(from: number | string, to: number | string, step: number = 1): number[] | string[]', function () {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upperCaseAlphabets = alphabets.map((alphabet) =>
      alphabet.toUpperCase()
    );

    it(`should create a range of numbers if passed in numeric values starting from the given
        from argument and stopping at the given end argument, stepping ahead according to the
        given step argument`, function () {
      expect(Utils.range(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(Utils.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
    });

    it(`should default step argument to 1 if it is less than or equal to zero`, function () {
      expect(Utils.range(0, 5, 0)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(Utils.range(0, 5, -2)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it(`should interchange from with to if from argument is greater than to argument`, function () {
      expect(Utils.range(5, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it(`should create a range of alphabets if passed in alphabet values starting from the given
        from argument and stopping at the given end argument, stepping ahead according to the
        given step argument`, function () {
      expect(Utils.range('a', 'z')).toEqual(alphabets);

      expect(Utils.range('a', 'z', 2)).toEqual(
        alphabets.filter((char, index) => index % 2 === 0)
      );
    });

    it(`should return alphabets in upper case if from argument is an upperCase letter`, function () {
      expect(Utils.range('A', 'Z')).toEqual(upperCaseAlphabets);
    });

    it(`should default ceil step value to an integer`, function () {
      expect(Utils.range('A', 'Z', 0.25)).toEqual(upperCaseAlphabets);

      expect(Utils.range('A', 'Z', 2.5)).toEqual(
        upperCaseAlphabets.filter((char, index) => index % 3 === 0)
      );
    });

    it(`should return empty array if from argument is a string but not a letter alphabet`, function () {
      expect(Utils.range(',', 'z')).toEqual([]);
    });

    it(`should default to argument to z if it is not an alphabet`, function () {
      expect(Utils.range('a', ',')).toEqual(alphabets);
    });
  });

  describe('.flatten<T>(arr: Array<T>, depth: number = 1)', function () {
    it(`should flatten the given array up to the given length`, function () {
      const testData = [1, 2, 3, 4, [5, 6, [7, 8, 9, [10]]]];
      expect(Utils.flatten(testData, 2)).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        [10],
      ]);
    });

    it(`should default the depth parameter to 1 if not given`, function () {
      const testData = [1, 2, 3, 4, [5, 6, [7, 8, 9, [10]]]];
      expect(Utils.flatten(testData)).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        [7, 8, 9, [10]],
      ]);
    });

    it(`should do nothing but return the array if the depth parameter is less than 1`, function () {
      const testData = [1, 2, 3, 4, [5, 6, [7, 8, 9, [10]]]];
      expect(Utils.flatten(testData, -1)).toEqual(testData);
    });
  });

  describe('.copy(target: object, ...objects: object[])', function () {
    const headers = { 'Content-Type': 'text/html' };
    const heights = [22, 33, 34, 37];

    it(`should copy all the objects into the target object without creating refrences`, function () {
      const copy = Utils.copy({}, { headers, heights, name: 'harrison' });
      expect(copy.headers).toEqual(headers);

      expect(copy.heights).toEqual(heights);
      expect(copy.name).toEqual('harrison');
    });

    it(`should keep existing properties and override when necessary`, function () {
      const colors = { white: '#fff', grey: '#777', faint: '#999' };

      const copy = Utils.copy(
        { colors: { white: '#000', red: 'red' } },
        { colors }
      );
      expect(copy.colors.white).toEqual('#fff');
      expect(copy.colors.red).toEqual('red');
    });
  });

  describe(`.camelCase(text: string, delimiter: string | RegExp = /[-_\\s]/): string`, function () {
    it(`should turn the given text string into camel casing using the given delimiter`, function () {
      expect(Utils.camelCase('my:string', ':')).toEqual('myString');
    });

    it(`should default the delimiter argument to /[_-\\s]/ if not given`, function () {
      expect(Utils.camelCase('my-second_string')).toEqual('mySecondString');
    });
  });

  describe(`.snakeCase(text: string, delimiter: string | RegExp = /[-_\\s]/): string`, function () {
    it(`should turn the given text string into snake casing using the given delimiter`, function () {
      expect(Utils.snakeCase('my:string', ':')).toEqual('my_string');
    });

    it(`should default the delimiter argument to /[_-\\s]/ if not given`, function () {
      expect(Utils.snakeCase('my-second_string')).toEqual('my_second_string');
    });
  });

  describe(`.capitalize(text: string): string`, function () {
    it(`should capitalize the given text`, function () {
      expect(Utils.capitalize('naMe')).toEqual('Name');
      expect(Utils.capitalize('')).toEqual('');
    });

    it(`should default the delimiter argument to /[_-\\s]/ if not given`, function () {
      expect(Utils.snakeCase('my-second_string')).toEqual('my_second_string');
    });
  });

  describe(`.expandProperty(target: object, key: string, value: any, delimiter: string = ".",
        caseStyle= CASE_STYLES.CAMEL_CASE)`, function () {
    it(`should expand the given keys into an object property`, function () {
      const target = Utils.expandProperty(
        {},
        'headers.contentType',
        'text/html'
      );
      expect(target.headers.contentType).toEqual('text/html');
    });

    it(`should apply camelCase styles to property names during the expansion`, function () {
      const target = Utils.expandProperty(
        {},
        'headers.content-type',
        'text/html',
        '.'
      );
      expect(target.headers.contentType).toEqual('text/html');
    });

    it(`should apply snake case styles to property names during the expansion if caseStyle
        argument is set to CASE_STYLES.SNAKE_CASE`, function () {
      const target = Utils.expandProperty(
        {},
        'headers.content-type',
        'text/html',
        '.',
        Utils.CASE_STYLES.SNAKE_CASE
      );
      expect(target.headers.content_type).toEqual('text/html');
      expect(target.headers).not.toHaveProperty('contentType');
    });

    it(`should apply no case styles to property names during the expansion if caseStyle
        argument is set to CASE_STYLES.NONE`, function () {
      const target = Utils.expandProperty(
        {},
        'headers.content-type',
        'text/html',
        '.',
        Utils.CASE_STYLES.NONE
      );
      expect(target.headers['content-type']).toEqual('text/html');
      expect(target.headers).not.toHaveProperty('contentType');
      expect(target.headers).not.toHaveProperty('content_type');
    });
  });

  describe('.padLeft(target: string | number, length:number = 4, padWith: string | number = 0): string', function () {
    it(`should pad the given target to the left with the given padWith value up till the
        target length meets the given length`, function () {
      expect(Utils.padLeft(12, 6, 0)).toEqual('000012');
      expect(Utils.padLeft(12, 3, '-')).toEqual('-12');
      expect(Utils.padLeft(12, 2, '-')).toEqual('12');
    });

    it(`should default the length to 4 and the padWith argument to 0 if not given`, function () {
      expect(Utils.padLeft(12)).toEqual('0012');
    });
  });

  describe('.padRight(target: string | number, length:number = 4, padWith: string | number = 0): string', function () {
    it(`should pad the given target to the right with the given padWith value up till the
        target length meets the given length`, function () {
      expect(Utils.padRight(12, 6, 0)).toEqual('120000');
      expect(Utils.padRight(12, 3, '-')).toEqual('12-');
      expect(Utils.padRight(12, 2, '-')).toEqual('12');
    });

    it(`should default the length to 4 and the padWith argument to 0 if not given`, function () {
      expect(Utils.padRight(12)).toEqual('1200');
    });
  });

  describe(`encodeDataEntry(name: string, value: string | number | (string|number)[],
        multiValueIdentifier: string = '[]'): string`, function () {
    it(`should encode the given name and value query parameter and return the result`, function () {
      expect(Utils.encodeDataEntry('name', 'Harrison')).toEqual(
        'name=Harrison'
      );
    });

    it(`should append the given multivalue parameter to array value query names for easy
            identification`, function () {
      const fruits = ['apple', 'orange', 'mango'];
      expect(Utils.encodeDataEntry('fruits', fruits, '{}')).toEqual(
        'fruits{}=apple&fruits{}=orange&fruits{}=mango'
      );
    });

    it(`should default the multivalue parameter to empty [] if not given`, function () {
      const fruits = ['apple', 'orange', 'mango'];
      expect(Utils.encodeDataEntry('fruits', fruits)).toEqual(
        'fruits[]=apple&fruits[]=orange&fruits[]=mango'
      );
    });
  });

  describe(`encodeData(query: {[name: string]: string | number | (string|number)[],
        multiValueIdentifier: string = '[]'): string`, function () {
    it(`should encode each name value entries in the given query object and return`, function () {
      expect(Utils.encodeData({ name: 'Harrison' })).toEqual('name=Harrison');
    });

    it(`should append the given multivalue parameter to array value query names for easy
            identification`, function () {
      const query = {
        name: 'Harrison',
        fruits: ['apple', 'orange', 'mango'],
      };
      expect(Utils.encodeData(query, '{}')).toEqual(
        'name=Harrison&fruits{}=apple&fruits{}=orange&fruits{}=mango'
      );
    });

    it(`should default the multivalue parameter to empty [] if not given`, function () {
      const query = {
        name: 'Harrison',
        fruits: ['apple', 'orange', 'mango'],
      };
      expect(Utils.encodeData(query)).toEqual(
        'name=Harrison&fruits[]=apple&fruits[]=orange&fruits[]=mango'
      );
    });
  });

  describe('.expandToNumeric(size: number | string): number', function () {
    it(`should expand the given unit based size to full numeric value multiplying value by
        1000 if unit is k case insensitive`, function () {
      expect(Utils.expandToNumeric('2.5k')).toEqual(2500);
      expect(Utils.expandToNumeric('.5k')).toEqual(500);
    });

    it(`should expand the given unit based size to full numeric value multiplying value by
        1000000 if unit is m or mb case insensitive`, function () {
      expect(Utils.expandToNumeric('2.5M')).toEqual(2500000);
      expect(Utils.expandToNumeric('.5mb')).toEqual(500000);
    });

    it(`should expand the given unit based size to full numeric value multiplying value by
        1000000000 if unit is g or gb case insensitive`, function () {
      expect(Utils.expandToNumeric('2.5G')).toEqual(2500000000);
      expect(Utils.expandToNumeric('.5gb')).toEqual(500000000);
    });

    it(`should expand the given unit based size to full numeric value multiplying value by
        1000000000000 if unit is T or tb case insensitive`, function () {
      expect(Utils.expandToNumeric('2.5T')).toEqual(2500000000000);
      expect(Utils.expandToNumeric('.5TB')).toEqual(500000000000);
    });

    it(`should return number if argument is a number`, function () {
      expect(Utils.expandToNumeric('2.5')).toEqual(2.5);
      expect(Utils.expandToNumeric(25)).toEqual(25);
    });

    it(`should return 0 if argument is a numeric unit`, function () {
      expect(Utils.expandToNumeric('a')).toEqual(0);
      expect(Utils.expandToNumeric('a00')).toEqual(0);
    });
  });

  describe('.stripSlashes(path: string): string', function () {
    it(`should strip beginning and ending backward or forward slashes from the given path`, function () {
      expect(Utils.stripSlashes('/path/to/resource/')).toEqual(
        'path/to/resource'
      );
      expect(Utils.stripSlashes('\\path/to/resource\\')).toEqual(
        'path/to/resource'
      );
      expect(Utils.stripSlashes('\\/\\/path/to/resource\\/\\/')).toEqual(
        'path/to/resource'
      );
    });
  });

  describe(`.convertToMemoryUnit(value: number, maximumFractionDigits: number = 2)`, function () {
    it(`should inspect the given number, convert it to its abbreviated form`, function () {
      expect(Utils.convertToMemoryUnit(5)).toEqual('5bytes');
      expect(Utils.convertToMemoryUnit(5000)).toEqual('5kb');
      expect(Utils.convertToMemoryUnit(5000000)).toEqual('5mb');
      expect(Utils.convertToMemoryUnit(5000000000)).toEqual('5gb');
      expect(Utils.convertToMemoryUnit(5000000000000)).toEqual('5tb');
    });

    it(`should keep the fractional part within the given maximumFractionDigits argument`, function () {
      const formater = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 1,
      });
      const value = 50002;
      expect(Utils.convertToMemoryUnit(value, 1)).toEqual(
        formater.format(value / 1000) + 'kb'
      );
    });
  });

  describe(`.convertToMonetaryUnit(value: number, maximumFractionDigits: number = 2)`, function () {
    it(`should inspect the given number, convert it to its abbreviated form`, function () {
      expect(Utils.convertToMonetaryUnit(5)).toEqual('5');
      expect(Utils.convertToMonetaryUnit(5000)).toEqual('5K');
      expect(Utils.convertToMonetaryUnit(5000000)).toEqual('5M');
      expect(Utils.convertToMonetaryUnit(5000000000)).toEqual('5B');
      expect(Utils.convertToMonetaryUnit(5000000000000)).toEqual('5T');
    });
  });

  describe(`uniqueArray<T = any>(array: T[]): T[]`, function () {
    it(`should return an array containing unique elements from the given array, respecting cases`, function () {
      expect(
        Utils.uniqueArray(['2', 2, '2', 0, '0', '0', null, null, undefined])
      ).toEqual(['2', 2, 0, '0', null, undefined]);
    });

    it(`should also check objects fo strict equality`, function () {
      const object1 = {};
      const object2 = {};
      expect(Utils.uniqueArray([object1, object1, object2])).toEqual([
        object1,
        object2,
      ]);
    });
  });

  describe(`isActivePath(path: string, currentPath?: string: prefixes: string | RegExp | Array<string | RegExp>)`, function () {
    it(`should return true if the given path leads to the current path`, function () {
      expect(Utils.isActivePath('/en', '/en/politics')).toBeTruthy();
    });

    it(`should return false if the given path leads to the current path, but it is the base path or prefix path`, function () {
      expect(Utils.isActivePath('/', '/en/politics')).toBeFalsy();
      expect(Utils.isActivePath('/en', '/en/politics', ['/en'])).toBeFalsy();
    });
  });
});
