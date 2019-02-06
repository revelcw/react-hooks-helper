import { testHook, act, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { useForm } from '../src';

afterEach(cleanup);

const initialValues = {
  foo: 'foo',
  isBar: false,
};

const initialValuesNested = {
  foo: {
    bar: 'bar',
  },
  foo2: {
    bar: 'bar',
  },
};

describe('useForm', () => {
  test('returns the initial values set in defaultValues', () => {
    let foo, isBar;
    testHook(() => ([{ foo, isBar }] = useForm(initialValues)));
    expect(foo).toBe('foo');
    expect(isBar).toBe(false);
  });

  test('returns changes a text field when we fire an onChange', () => {
    let foo, setForm;
    testHook(() => ([{ foo }, setForm] = useForm(initialValues)));
    const event = { target: { type: 'text', name: 'foo', value: 'bar' } };
    act(() => setForm(event));
    expect(foo).toBe('bar');
  });

  test('returns changes a checkbox when we fire an onChange', () => {
    let isBar, setForm;
    testHook(() => ([{ isBar }, setForm] = useForm(initialValues)));
    const event = { target: { type: 'checkbox', name: 'isBar', checked: true } };
    act(() => setForm(event));
    expect(isBar).toBe(true);
  });

  test('supports nested paths for names', () => {
    let foo, foo2, setForm;
    testHook(() => ([{ foo, foo2 }, setForm] = useForm(initialValuesNested)));
    const event = { target: { type: 'text', name: 'foo.bar', value: 'baz' } };
    act(() => setForm(event));
    expect(foo.bar).toBe('baz');
    expect(foo2.bar).toBe('bar');
  });
});
