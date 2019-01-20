import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useTrafficLight } from '../src';

afterEach(cleanup);
jest.useFakeTimers();

const Component = ({ initialColorIndex, durations }) => {
  const index = useTrafficLight(initialColorIndex, durations);
  return <span>{index}</span>;
};

describe('useTrafficLight', () => {
  test('import { useTrafficLight } from "react-hooks-helper"', () => {
    expect(typeof useTrafficLight).toBe('function');
  });
  test('defaults to an initial index of 0', () => {
    const { container } = render(<Component />);
    const child = container.firstChild;
    expect(child.textContent).toBe('0');
  });
  test('supports a custom initial index of 0, 1, or 2', () => {
    [0, 1, 2].forEach((i) => {
      const { container } = render(<Component initialColorIndex={i} />);
      const child = container.firstChild;
      expect(child.textContent).toBe(`${i}`);
    });
  });
  test('has a default duration array of [5000, 4000, 1000] msecs', () => {
    const { container } = render(<Component />);
    const child = container.firstChild;
    expect(child.textContent).toBe('0');
    jest.advanceTimersByTime(5000);
    expect(child.textContent).toBe('1');
    jest.advanceTimersByTime(4000);
    expect(child.textContent).toBe('2');
    jest.advanceTimersByTime(1000);
    expect(child.textContent).toBe('0');
  });
  test('supports a custom duration array', () => {
    const { container } = render(<Component durations={[500, 400, 100]} />);
    const child = container.firstChild;
    expect(child.textContent).toBe('0');
    jest.advanceTimersByTime(500);
    expect(child.textContent).toBe('1');
    jest.advanceTimersByTime(400);
    expect(child.textContent).toBe('2');
    jest.advanceTimersByTime(100);
    expect(child.textContent).toBe('0');
  });
});
