import {jest, describe, test, expect} from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import useScreenSize from '../useScreenSize';
jest.mock('../../utils/env');
import { SCREEN_SIZES } from '../../utils/constants';


Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 375});
describe('useScreenSize', () => {
  test('returns SCREEN_SIZES reference object', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.SCREEN_SIZES).toStrictEqual(SCREEN_SIZES);
  });

   test('should return small mobile screen size', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.screenSize).toEqual(SCREEN_SIZES.MOBILE_SMALL);
  });

  test('should return large mobile on screen sizes between 375px and 425px', () => {
    window.innerWidth = 376;
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.screenSize).toEqual(SCREEN_SIZES.MOBILE_LARGE);

    act(() => {
      window.innerWidth = 425;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.screenSize).toEqual(SCREEN_SIZES.MOBILE_LARGE);
  });

  test('should return tablet on screen sizes between 425px and 768px', () => {
    window.innerWidth = 426;
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.screenSize).toEqual(SCREEN_SIZES.TABLET);

    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.screenSize).toEqual(SCREEN_SIZES.TABLET);
  });

  test('should return desktop on screen sizes greater than or equal to 1024px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useScreenSize());
    expect(result.current.screenSize).toEqual(SCREEN_SIZES.DESKTOP);

    act(() => {
      window.innerWidth = 1920;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.screenSize).toEqual(SCREEN_SIZES.DESKTOP);
  });
});