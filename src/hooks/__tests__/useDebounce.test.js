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
});