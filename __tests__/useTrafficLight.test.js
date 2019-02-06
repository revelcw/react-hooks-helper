import { testHook, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useTrafficLight } from '../src';

afterEach(cleanup);
jest.useFakeTimers();

describe('useTrafficLight', () => {
  test('import { useTrafficLight } from "react-hooks-helper"', () => {
    expect(typeof useTrafficLight).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    let value;
    testHook(() => (value = useTrafficLight()));
    expect(value).toBe(0);
  });
  test('supports a custom initial index of 0, 1, or 2', () => {
    [0, 1, 2].forEach((i) => {
      let value;
      testHook(() => (value = useTrafficLight(i)));
      expect(value).toBe(i);
    });
  });
  test('has a default duration array of [5000, 4000, 1000] msecs', () => {
    let value;
    testHook(() => (value = useTrafficLight()));
    expect(value).toBe(0);
    jest.advanceTimersByTime(5000);
    expect(value).toBe(1);
    jest.advanceTimersByTime(4000);
    expect(value).toBe(2);
    jest.advanceTimersByTime(1000);
    expect(value).toBe(0);
  });
  test('supports a custom duration array', () => {
    let value;
    testHook(() => (value = useTrafficLight(0, [500, 400, 100])));
    expect(value).toBe(0);
    jest.advanceTimersByTime(500);
    expect(value).toBe(1);
    jest.advanceTimersByTime(400);
    expect(value).toBe(2);
    jest.advanceTimersByTime(100);
    expect(value).toBe(0);
  });
});
