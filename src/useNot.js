import { useState } from 'react';

const useNot = (initialValue) => {
  const [value, setValue] = useState(!!initialValue);
  return [
    value,
    () => setValue(currentValue => !currentValue),
  ];
};

export default useNot;
