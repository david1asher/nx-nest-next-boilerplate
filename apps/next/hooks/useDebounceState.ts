import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

export const useDebounceState = <T>(
  initial: T,
  delay: number
): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const [unDebouncedValue, setUnDebouncedValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);

  const updateValue = useCallback(
    debounce((newValue: T) => {
      setDebouncedValue(newValue);
    }, delay),
    [delay]
  );

  useEffect(() => {
    updateValue(unDebouncedValue);
  }, [unDebouncedValue, delay, updateValue]);

  return [debouncedValue, setUnDebouncedValue, unDebouncedValue];
};
