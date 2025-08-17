import { useState, useEffect } from 'react';
import { SCREEN_SIZES } from '../utils/constants';

const useScreenSize = () => {
  const [ screenSize, setScreenSize ] = useState(null);

  const resizeHandler = () => {
    const width = window.innerWidth;

    if (width <= 375) {
      setScreenSize(SCREEN_SIZES.MOBILE_SMALL);
    } else if (width <= 425) {
      setScreenSize(SCREEN_SIZES.MOBILE_LARGE);
    } else if (width <= 768) {
      setScreenSize(SCREEN_SIZES.TABLET);
    } else {
      setScreenSize(SCREEN_SIZES.DESKTOP);
    }
  }

  useEffect(() => {
    if (!window) return;
      
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return { screenSize, SCREEN_SIZES };
};

export default useScreenSize;