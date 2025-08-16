import {jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals'
import { renderHook, act } from '@testing-library/react';
import useInfiniteScroll from '../useInfiniteScroll';

let scrollY = 0;
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, configurable: true, value: 2000 });
Object.defineProperty(window, 'scrollY', { configurable: true, get: () => scrollY});

describe('useInfiniteScroll', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    scrollY = 0;
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('calls callback when scrolling to bottom', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        callback,
        delay: 50,
        offset: 0,
        isLoading: false,
      })
    );

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    jest.advanceTimersByTime(50);

    expect(callback).toHaveBeenCalled();
  });

  test('defaults work as expected', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        callback
      })
    );

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    jest.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalled();
  });

  test('does not call callback when isLoading is true', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        callback,
        delay: 50,
        offset: 0,
        isLoading: true,
      })
    );

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    jest.advanceTimersByTime(50);

    expect(callback).not.toHaveBeenCalled();
  });

  test('respects offset', () => {
    const callback = jest.fn();
    const offset = 200;

    renderHook(() =>
      useInfiniteScroll({
        callback,
        delay: 50,
        offset,
        isLoading: false,
      })
    );

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    act(() => {
      scrollY = docHeight - winHeight - offset - 1;
      window.dispatchEvent(new Event('scroll'));
    });
    jest.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      scrollY = docHeight - winHeight - offset + 1;
      window.dispatchEvent(new Event('scroll'));
    });
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('debounces multiple rapid scroll events', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        callback,
        delay: 200,
        offset: 0,
        isLoading: false,
      })
    );

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('resets debounce if scroll continues before delay', () => {
    const callback = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        callback,
        delay: 200,
        offset: 0,
        isLoading: false,
      })
    );

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      scrollY = 1000;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});