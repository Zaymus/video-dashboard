import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';

import SearchBar from '../SearchBar/SearchBar';

describe('SearchBar component testing', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('handlers work as intended with no ref', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce(null);
    const { container } = render(<SearchBar />);

    fireEvent["focus"](screen.getByPlaceholderText("Search"));
    expect(container).toMatchSnapshot();
    fireEvent["blur"](screen.getByPlaceholderText("Search"));
    expect(container).toMatchSnapshot();
  });
  test('matches snapshot', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot - focus', () => {
    const { container } = render(<SearchBar />);
    fireEvent["focus"](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot - blur', () => {
    const { container } = render(<SearchBar />);
    fireEvent['focus'](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent["blur"](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot - button hover', () => {
    const { container } = render(<SearchBar />);
    fireEvent["mouseEnter"](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot - button blur', () => {
    const { container } = render(<SearchBar />);
    fireEvent["mouseEnter"](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent["mouseLeave"](screen.getByPlaceholderText("Search"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container).toMatchSnapshot();
  });
});