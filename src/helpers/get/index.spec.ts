import { get } from '.';

describe('.get', () => {
  const object = {
    fonts: {
      heading: 'Roboto',
      body: 'Rubik',
    },
    space: [0, 4, 6, 8, 12, 16, 20, 24, 32],
  };
  it(`should return a value from the given object`, () => {
    expect(get(object, 'space.2')).toEqual(6);
    expect(get(object, 'fonts.heading')).toEqual('Roboto');
  });
});
