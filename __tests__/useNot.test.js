import { proxyHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import { useNot } from '../src';

const useNotProxy = proxyHook(useNot);

afterEach(cleanup);

const value = 0;
const notValue = 1;

describe('useNot', () => {
  test('returns the initial value of `true`', () => {
    const returnValue = useNotProxy(true);
    expect(returnValue[value]).toBe(true);
  });

  test('returns the initial value of `true` if truthy value passed', () => {
    const returnValue = useNotProxy('foo');
    expect(returnValue[value]).toBe(true);
  });

  test('returns the initial value of `false`', () => {
    const returnValue = useNotProxy(false);
    expect(returnValue[value]).toBe(false);
  });

  test('returns the initial value of `false` if no param specified', () => {
    const returnValue = useNotProxy();
    expect(returnValue[value]).toBe(false);
  });

  test('toggles from when we call the not function', () => {
    const returnValue = useNotProxy();
    expect(returnValue[value]).toBe(false);
    returnValue[notValue]();
    expect(returnValue[value]).toBe(true);
    returnValue[notValue]();
    expect(returnValue[value]).toBe(false);
  });
});
