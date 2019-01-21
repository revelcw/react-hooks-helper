import { proxyHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import { useStep } from '../src';

const useStepProxy = proxyHook(useStep);

afterEach(cleanup);
jest.useFakeTimers();

describe('useStep', () => {
  test('import { useStep } from "react-hooks-helper"', () => {
    expect(typeof useStep).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    const returnValue = useStepProxy({ steps: 3 });
    expect(returnValue.index).toBe(0);
  });
  test('can be passed an `initialStep` as a number)', () => {
    const returnValue = useStepProxy({ steps: 3, initialStep: 1 });
    expect(returnValue.index).toBe(1);
  });
  test('can be passed an `initialStep` as a string', () => {
    expect(() => {
      useStepProxy({ steps: 3, initialStep: 'foo' });
    }).toThrow();
  });
  test('can be passed `steps` as a number', () => {
    const returnValue = useStepProxy({ steps: 3, initialStep: 1 });
    expect(returnValue.step).toEqual({});
  });
  test('can be passed `steps` as an array', () => {
    const returnValue = useStepProxy({ initialStep: 1, steps: [{ foo: 'foo' }, { foo: 'bar' }] });
    expect(returnValue.step).toEqual({ foo: 'bar' });
  });
  test('errors if `steps` is not a number or an array', () => {
    expect(() => {
      useStepProxy({ steps: 'foo', initialStep: 1 });
    }).toThrow();
  });
  test('can be passed an optional `autoAdvanceDuration`', () => {
    const returnValue = useStepProxy({ steps: 3, autoAdvanceDuration: 500 });
    expect(returnValue.index).toBe(0);
    jest.advanceTimersByTime(500);
    expect(returnValue.index).toBe(1);
  });
  test('you can call `next` to advance to the next step (steps wrap)', () => {
    const returnValue = useStepProxy({ steps: 3, initialStep: 1 });
    expect(returnValue.index).toBe(1);
    returnValue.navigation.next();
    expect(returnValue.index).toBe(2);
    returnValue.navigation.next();
    expect(returnValue.index).toBe(0);
  });
  test('you can call `previous` to advance to the previous step (steps wrap)', () => {
    const returnValue = useStepProxy({ steps: 3, initialStep: 1 });
    expect(returnValue.index).toBe(1);
    returnValue.navigation.previous();
    expect(returnValue.index).toBe(0);
    returnValue.navigation.previous();
    expect(returnValue.index).toBe(2);
  });
  test('you can call `go` to go to a specific index', () => {
    const returnValue = useStepProxy({ steps: 3 });
    expect(returnValue.index).toBe(0);
    returnValue.navigation.go(1);
    expect(returnValue.index).toBe(1);
  });
  test('you can call `go` to go to a specific `step.id`', () => {
    const returnValue = useStepProxy({ steps: [{ id: 'bar' }, { id: 'foo' }] });
    expect(returnValue.index).toBe(0);
    returnValue.navigation.go('foo');
    expect(returnValue.index).toBe(1);
  });
  test('errors of you can call `go` with an index out of range', () => {
    const returnValue = useStepProxy({ steps: 3 });
    expect(() => {
      returnValue.navigation.go(42);
    }).toThrow();
  });
  test('errors of you can call `go` with an `id` and the `step.id` is not found', () => {
    const returnValue = useStepProxy({ steps: 3 });
    expect(() => {
      returnValue.navigation.go('foo');
    }).toThrow();
  });
  test('you can call `pause` to pause auto advance', () => {
    const returnValue = useStepProxy({ steps: 3, autoAdvanceDuration: 500 });
    expect(returnValue.index).toBe(0);
    jest.advanceTimersByTime(250);
    returnValue.navigation.pause();
    jest.advanceTimersByTime(250);
    expect(returnValue.index).toBe(0);
  });
  test('you can call `play` to restart auto advance', () => {
    const returnValue = useStepProxy({ steps: 3, autoAdvanceDuration: 500 });
    expect(returnValue.index).toBe(0);
    jest.advanceTimersByTime(250);
    returnValue.navigation.pause();
    returnValue.navigation.play();
    jest.advanceTimersByTime(500);
    expect(returnValue.index).toBe(1);
  });
});
