import { useState, useEffect } from 'react';

export const useNot = (initialValue) => {
  const [value, setValue] = useState(!!initialValue);
  return [
    value,
    () => setValue(currentValue => !currentValue),
  ];
};

export const useForm = (initialState) => {
  const [formValues, setValue] = useState(initialState);

  return [
    formValues,
    (ev) => {
      const {
        name, value, checked, type,
      } = ev.target;
      const isCheckbox = type === 'checkbox' || type === 'radio';
      setValue(currentValue => (
        {
          ...currentValue,
          [name]: !isCheckbox || (isCheckbox && checked === true) ? value : checked,
        }
      ));
    },
  ];
};

export const useTrafficLight = (initialIndex = 0, durations = [5000, 4000, 1000]) => {
  const [colorIndex, setIndex] = useState(initialIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((colorIndex + 1) % durations.length);
    }, durations[colorIndex]);
    return () => clearTimeout(timer);
  });

  return colorIndex;
};
