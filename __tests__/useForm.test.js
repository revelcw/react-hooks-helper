import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useForm } from '../src';

afterEach(cleanup);

const Component = () => {
  const initialValues = {
    foo: 'foo',
    isBar: false,
  };

  const [{ foo, isBar }, setForm] = useForm(initialValues);
  return (
    <div>
      <input type="text" name="foo" value={foo} onChange={setForm} />
      <input type="checkbox" name="isBar" checked={isBar} onChange={setForm} />
    </div>
  );
};

const NestedComponent = () => {
  const initialValues = {
    foo: {
      bar: 'bar',
    },
    foo2: {
      bar: 'bar',
    },
  };

  const [{ foo, foo2 }, setForm] = useForm(initialValues);
  return (
    <div>
      <input type="text" name="foo.bar" value={foo.bar} onChange={setForm} />
      <input type="text" name="foo2.bar" value={foo2.bar} onChange={setForm} />
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

  test('supports nested paths for names', () => {
    const { container } = render(<NestedComponent />);

    const fooEl = container.firstChild.firstChild;
    const foo2El = container.firstChild.lastChild;
    expect(fooEl.value).toBe('bar');
    expect(foo2El.value).toBe('bar');

    fireEvent.change(fooEl, { target: { value: 'baz' } });
    expect(fooEl.value).toBe('baz');
    expect(foo2El.value).toBe('bar');
  });
});
