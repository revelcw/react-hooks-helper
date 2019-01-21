import { proxyHook, cleanup } from 'react-proxy-hook';
import 'jest-dom/extend-expect';

import { useForm } from '../src';

const useFormProxy = proxyHook(useForm);

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

const formData = 0;
const setForm = 1;

describe('useForm', () => {
  test('returns the initial values set in defaultValues', () => {
    const form = useFormProxy(initialValues);
    expect(form[formData].foo).toBe('foo');
    expect(form[formData].isBar).toBe(false);
  });

  test('returns changes a text field when we fire an onChange', () => {
    const form = useFormProxy(initialValues);
    form[setForm]({ target: { type: 'text', name: 'foo', value: 'bar' } });
    expect(form[formData].foo).toBe('bar');
  });

  test('returns changes a checkbox when we fire an onChange', () => {
    const form = useFormProxy(initialValues);
    form[setForm]({ target: { type: 'checkbox', name: 'isBar', checked: true } });
    expect(form[formData].isBar).toBe(true);
  });

  test('supports nested paths for names', () => {
    const form = useFormProxy(initialValuesNested);
    expect(form[formData].foo.bar).toBe('bar');
    expect(form[formData].foo2.bar).toBe('bar');
    form[setForm]({ target: { type: 'text', name: 'foo.bar', value: 'baz' } });
    expect(form[formData].foo.bar).toBe('baz');
    expect(form[formData].foo2.bar).toBe('bar');
  });
});
