import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { render, act, screen, fireEvent } from '@testing-library/react';
import Header from '../Header/Header';
import { MemoryRouter } from 'react-router';

jest.mock('../../utils/env');

Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
describe('Header component test', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  })
  test('matches snapshot in desktop view', () => {
    const { container } = render(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot in tablet view', () => {
    window.innerWidth = 768;
    const { container } = render(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot in mobile view', () => {
    window.innerWidth = 375;
    const { container } = render(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot in mobile view - expanded', () => {
    window.innerWidth = 375;
    const { container } = render(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    act(() => {
      fireEvent.click(screen.getByRole('button'));
      jest.advanceTimersByTime(500);
    });
    expect(container).toMatchSnapshot();
  });

});