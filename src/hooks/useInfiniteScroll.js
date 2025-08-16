import { useEffect, useRef } from 'react';
import useDebounce from "./useDebounce";

const useInfiniteScroll = ({ callback, delay=200, offset=0, isLoading=false} ) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const scrollHandler = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (!isLoading && scrollTop + windowHeight >= docHeight - offset) callbackRef.current();
  }

  const debouncedScroll = useDebounce(scrollHandler, delay);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll])
}

export default useInfiniteScroll;