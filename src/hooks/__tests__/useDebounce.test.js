import { jest, describe, test, expect, beforeEach, afterAll } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should not assign the value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result).not.toEqual('test');
  });

  test('should assign value after delay', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toEqual('test');
  });

  test('should call function after delay', () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useDebounce(cb, 500));
    act(() => {
      result.current();
    });
    
    expect(cb).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(cb).toHaveBeenCalled();
  });
});