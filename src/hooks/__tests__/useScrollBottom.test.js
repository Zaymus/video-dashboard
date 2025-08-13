import { describe, test, expect, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import useScrollBottom from '../useScrollBottom';

describe('useScrollBottom', () => {
   beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, configurable: true, value: 3000 });
  });
  test('Return false initially', () => {
    const { result } = renderHook(() => useScrollBottom());
    expect(result.current).toBe(false);
  });

  test('Returns true when scrolled to the bottom', () => {
    const { result } = renderHook(() => useScrollBottom());

    act(() => {
      window.scrollY = 2000;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  test('Return false when not at the bottom', () => {
    const { result } = renderHook(() => useScrollBottom());

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  test('Respects offset param', () => {
    const { result } = renderHook(() => useScrollBottom(50));

    act(() => {
      window.scrollY = 1960;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });
})