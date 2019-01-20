import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useNot } from '../src';

afterEach(cleanup);

const Component = ({ initialValue }) => {
  const [value, notValue] = useNot(initialValue);
  return <button onClick={notValue}>{`${value}`}</button>;
};

describe('useNot', () => {
  test('returns the initial value of `true`', () => {
    const { container } = render(<Component initialValue={true} />);
    const child = container.firstChild;
    expect(child.textContent).toBe('true');
  });

  test('returns the initial value of `true` if truthy value passed', () => {
    const { container } = render(<Component initialValue="foo" />);
    const child = container.firstChild;
    expect(child.textContent).toBe('true');
  });

  test('returns the initial value of `false`', () => {
    const { container } = render(<Component initialValue={false} />);
    const child = container.firstChild;
    expect(child.textContent).toBe('false');
  });

  test('returns the initial value of `false` if no param specified', () => {
    const { container } = render(<Component />);
    const child = container.firstChild;
    expect(child.textContent).toBe('false');
  });

  test('toggles from when we call the not function', () => {
    const { container } = render(<Component />);
    const child = container.firstChild;
    expect(child.textContent).toBe('false');
    fireEvent.click(child);
    expect(child.textContent).toBe('true');
    fireEvent.click(child);
    expect(child.textContent).toBe('false');
  });
});
