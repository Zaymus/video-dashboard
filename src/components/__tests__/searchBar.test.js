import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';
jest.mock('../../utils/env');
import SearchBar from '../SearchBar/SearchBar';

Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
describe('SearchBar component testing', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Desktop/Tablet SearchBar', () => {
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

  describe('Mobile SearchBar', () => {
    beforeAll(() => {
      window.innerWidth = 425;
    });
    test('matches snapshot - collapsed', () => {
      const { container } = render(<SearchBar />);

      expect(container).toMatchSnapshot();
    });

    test('matches snapshot - expanded', () => {
      const { container } = render(<SearchBar />);

      expect(container).toMatchSnapshot();

      act(() => {
        fireEvent.click(screen.getByTestId('search-button'));
        jest.advanceTimersByTime(1000);
      });

      expect(container).toMatchSnapshot();
    });

    test('matches snapshot - expanded to collapsed', () => {
      const { container } = render(<SearchBar />);

      act(() => {
        fireEvent.click(screen.getByTestId('search-button'));
        jest.advanceTimersByTime(1000);
      });

      expect(container).toMatchSnapshot();

      act(() => {
        fireEvent.click(screen.getByTestId('back-button'));
        jest.advanceTimersByTime(1000);
      });

       expect(container).toMatchSnapshot();
    });
  });
});