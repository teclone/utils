import * as Utils from '../src/index';

describe('Utils', function() {
    describe('.isString(arg)', function() {
        it(`should return true if argument is a string`, function() {
            expect(Utils.isString('my string')).toBeTruthy();
        });
    });
});