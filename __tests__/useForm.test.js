import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useForm } from '../src';

const Component = () => {
  const defaultValues = {
    foo: 'foo',
    isBar: false,
  };

  const [{ foo, isBar }, setForm] = useForm(defaultValues);
  return (
    <div>
      <input type="text" name="foo" value={foo} onChange={setForm} />
      <input type="checkbox" name="isBar" checked={isBar} onChange={setForm} />
    </div>
  );
};

describe('useForm', () => {
  test('returns the initial values set in defaultValues', () => {
    const { container } = render(<Component />);

    const fooEl = container.firstChild.firstChild;
    expect(fooEl.value).toBe('foo');

    const isBarEl = container.firstChild.lastChild;
    expect(isBarEl.checked).toBe(false);
  });

  test('returns changes a text field when we fire an onChange', () => {
    const { container } = render(<Component />);

    const fooEl = container.firstChild.firstChild;
    fireEvent.change(fooEl, { target: { value: 'bar' } });
    expect(fooEl.value).toBe('bar');
  });

  test('returns changes a checkbox when we fire an onChange', () => {
    const { container } = render(<Component />);

    const isBarEl = container.firstChild.lastChild;
    fireEvent.click(isBarEl);
    expect(isBarEl.checked).toBe(true);
  });
});
