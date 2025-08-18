import { useEffect, useRef, useCallback } from 'react';
import useDebounce from "./useDebounce";

const useInfiniteScroll = ({ callback, delay=200, offset=0, isLoading=false, targetRef }) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const scrollHandler = useCallback(() => {
    if (isLoading) return;

    const target = targetRef?.current;
    const scrollTop = target ? target.scrollTop : window.scrollY;
    const clientHeight = target ? target.clientHeight : window.innerHeight;
    const scrollHeight = target ? target.scrollHeight : document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - offset) {
      callbackRef.current();
    }
  }, [isLoading, offset, targetRef]);

  const debouncedScrollHandler = useDebounce(scrollHandler, delay);

  useEffect(() => {
    let target = targetRef?.current || window;
    let observer;

    if (targetRef && !target.current) {
      observer = new MutationObserver(() => {
        if (targetRef.current) {
          target = targetRef.current;
          target.addEventListener("scroll", debouncedScrollHandler);
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      target.addEventListener("scroll", debouncedScrollHandler);
    }

    return () => {
      if (observer) observer.disconnect();
      if (target) target.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, [targetRef, debouncedScrollHandler]);
}

export default useInfiniteScroll;