import { useState, useEffect } from 'react';
import { invoke } from 'q';

export const useNot = (initialValue) => {
  const [value, setValue] = useState(!!initialValue);
  return [
    value,
    () => setValue(currentValue => !currentValue),
  ];
};

export const useForm = initialState => {
  const [value, setValue] = useState(initialState);

  return [
    value,
    ev => {
      const { name, value } = ev.target;
      setValue(currentValue => ({ ...currentValue, [name]: value }));
    },
  ];
};

export const useTrafficLight = (initialIndex = 0, durations = [5000, 4000, 1000]) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((colorIndex + 1) % durations.length);
    }, durations[index]);
    return () => clearTimeout(timer);
  });

  return colorIndex;
};