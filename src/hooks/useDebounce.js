import { useEffect, useState, useRef } from 'react';

const useDebounce = (input, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(undefined);
  const callbackRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    if (typeof input === 'function') {
      callbackRef.current = input;
    }
  }, [input]);

  const debouncedFn = useRef();
  if (typeof input === 'function' && !debouncedFn.current) {
    debouncedFn.current = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
      }, delay);
    };
  }

  useEffect(() => {
    if (typeof input !== 'function') {
      const timerID = setTimeout(() => setDebouncedValue(input), delay);
      return () => clearTimeout(timerID);
    }
  }, [input, delay]);

  return typeof input === 'function' ? debouncedFn.current : debouncedValue;
}

export default useDebounce;