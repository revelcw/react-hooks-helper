import { testHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import { useStep } from '../src';

afterEach(cleanup);
jest.useFakeTimers();

describe('useStep', () => {
  test('import { useStep } from "react-hooks-helper"', () => {
    expect(typeof useStep).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    let index;
    testHook(() => ({ index } = useStep({ steps: 3 })));
    expect(index).toBe(0);
  });
  test('can be passed an `initialStep` as a number)', () => {
    let index;
    testHook(() => ({ index } = useStep({ steps: 3, initialStep: 1 })));
    expect(index).toBe(1);
  });
  test('can be passed an `initialStep` as a string', () => {
    expect(() => {
      testHook(() => (useStep({ steps: 3, initialStep: 'foo' })));
    }).toThrow();
  });
  test('can be passed `steps` as a number', () => {
    let step;
    testHook(() => ({ step } = useStep({ steps: 3, initialStep: 1 })));
    expect(step).toEqual({});
  });
  test('can be passed `steps` as an array', () => {
    let step;
    testHook(() => ({ step } = useStep({ initialStep: 1, steps: [{ foo: 'foo' }, { foo: 'bar' }] })));
    expect(step).toEqual({ foo: 'bar' });
  });
  test('errors if `steps` is not a number or an array', () => {
    expect(() => {
      testHook(() => useStep({ steps: 'foo', initialStep: 1 }));
    }).toThrow();
  });
  test('can be passed an optional `autoAdvanceDuration`', () => {
    let index;
    testHook(() => ({ index } = useStep({ steps: 3, autoAdvanceDuration: 500 })));
    expect(index).toBe(0);
    jest.advanceTimersByTime(500);
    expect(index).toBe(1);
  });
  test('you can call `next` to advance to the next step (steps wrap)', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: 3, initialStep: 1 })));
    navigation.next();
    expect(index).toBe(2);
    navigation.next();
    expect(index).toBe(0);
  });
  test('you can call `previous` to advance to the previous step (steps wrap)', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: 3, initialStep: 1 })));
    expect(index).toBe(1);
    navigation.previous();
    expect(index).toBe(0);
    navigation.previous();
    expect(index).toBe(2);
  });
  test('you can call `go` to go to a specific index', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: 3 })));
    expect(index).toBe(0);
    navigation.go(1);
    expect(index).toBe(1);
  });
  test('you can call `go` to go to a specific `step.id`', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: [{ id: 'bar' }, { id: 'foo' }] })));
    expect(index).toBe(0);
    navigation.go('foo');
    expect(index).toBe(1);
  });
  test('errors of you can call `go` with an index out of range', () => {
    let navigation;
    testHook(() => ({ navigation } = useStep({ steps: 3 })));
    expect(() => {
      navigation.go(42);
    }).toThrow();
  });
  test('errors of you can call `go` with an `id` and the `step.id` is not found', () => {
    let navigation;
    testHook(() => ({ navigation } = useStep({ steps: 3 })));
    expect(() => {
      navigation.go('foo');
    }).toThrow();
  });
  test('you can call `pause` to pause auto advance', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: 3, autoAdvanceDuration: 500 })));
    expect(index).toBe(0);
    jest.advanceTimersByTime(250);
    navigation.pause();
    jest.advanceTimersByTime(250);
    expect(index).toBe(0);
  });
  test('you can call `play` to restart auto advance', () => {
    let index, navigation;
    testHook(() => ({ index, navigation } = useStep({ steps: 3, autoAdvanceDuration: 500 })));
    expect(index).toBe(0);
    jest.advanceTimersByTime(250);
    navigation.pause();
    navigation.play();
    jest.advanceTimersByTime(500);
    expect(index).toBe(1);
  });
});
