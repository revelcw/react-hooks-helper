import { testHook, act, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useNot } from '../src';

afterEach(cleanup);

describe('useNot', () => {
  test('returns the initial value of `true`', () => {
    let value;
    testHook(() => ([value] = useNot(true)));
    expect(value).toBe(true);
  });

  test('returns the initial value of `true` if truthy value passed', () => {
    let value;
    testHook(() => ([value] = useNot('foo')));
    expect(value).toBe(true);
  });

  test('returns the initial value of `false`', () => {
    let value;
    testHook(() => ([value] = useNot(false)));
    expect(value).toBe(false);
  });

  test('returns the initial value of `false` if no param specified', () => {
    let value;
    testHook(() => ([value] = useNot()));
    expect(value).toBe(false);
  });

  test('toggles from when we call the not function', () => {
    let value, notValue;
    testHook(() => ([value, notValue] = useNot()));
    expect(value).toBe(false);
    notValue();
    expect(value).toBe(true);
    act(() => notValue());
    expect(value).toBe(false);
  });
});
