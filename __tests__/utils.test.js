import 'jest-dom/extend-expect';

import { getChildData, cloneDeepLimited } from '../src/utils';

describe('utils', () => {
  test('getChildData returns a value given an object and a key', () => {
    expect(getChildData({ foo: 'bar' }, 'foo')).toBe('bar');
    expect(getChildData({ foo: 'bar' }, 'baz')).toBe(undefined);
    expect(getChildData({ foo: { foo: 'bar' } }, 'foo')).toEqual({ foo: 'bar' });
  });
  test('cloneDeepLimited deeply clones an object', () => {
    expect(cloneDeepLimited({ foo: { foo: 'bar' } })).toEqual({ foo: { foo: 'bar' } });
  });
});
