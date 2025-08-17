import {jest, describe, test, expect, afterAll} from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import useScreenSize from '../useScreenSize';
jest.mock('../../utils/env');
import { SCREEN_SIZES } from '../../utils/constants';


Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 767});
const windowClone = globalThis.window;
describe('useScreenSize', () => {
  afterAll(() => {
    globalThis.window = windowClone;
  });
  test('should return mobile on screen sizes less than 768px', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual(SCREEN_SIZES.MOBILE);
  });

  test('should return tablet on screen sizes greater than or equal to 768px but less than 1024px', () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual(SCREEN_SIZES.TABLET);

    act(() => {
      window.innerWidth = 1023;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual(SCREEN_SIZES.TABLET);

    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).not.toEqual(SCREEN_SIZES.TABLET);
  });

  test('should return desktop on screen sizes greater than or equal to 1024px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useScreenSize());
    expect(result.current).toEqual(SCREEN_SIZES.DESKTOP);

    act(() => {
      window.innerWidth = 1920;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual(SCREEN_SIZES.DESKTOP);
  });
});