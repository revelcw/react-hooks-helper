import { proxyHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import { useTrafficLight } from '../src';

const useTrafficLightProxy = proxyHook(useTrafficLight);

afterEach(cleanup);
jest.useFakeTimers();

describe('useTrafficLight', () => {
  test('import { useTrafficLight } from "react-hooks-helper"', () => {
    expect(typeof useTrafficLight).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    const returnValue = useTrafficLightProxy();
    expect(returnValue.value).toBe(0);
  });
  test('supports a custom initial index of 0, 1, or 2', () => {
    [0, 1, 2].forEach((i) => {
      const returnValue = useTrafficLightProxy(i);
      expect(returnValue.value).toBe(i);
    });
  });
  test('has a default duration array of [5000, 4000, 1000] msecs', () => {
    const returnValue = useTrafficLightProxy();
    expect(returnValue.value).toBe(0);
    jest.advanceTimersByTime(5000);
    expect(returnValue.value).toBe(1);
    jest.advanceTimersByTime(4000);
    expect(returnValue.value).toBe(2);
    jest.advanceTimersByTime(1000);
    expect(returnValue.value).toBe(0);
  });
  test('supports a custom duration array', () => {
    const returnValue = useTrafficLightProxy(0, [500, 400, 100]);
    expect(returnValue.value).toBe(0);
    jest.advanceTimersByTime(500);
    expect(returnValue.value).toBe(1);
    jest.advanceTimersByTime(400);
    expect(returnValue.value).toBe(2);
    jest.advanceTimersByTime(100);
    expect(returnValue.value).toBe(0);
  });
});
