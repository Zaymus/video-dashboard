import { jest, describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import Header from '../Header/Header';
import { MemoryRouter } from 'react-router';

Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
describe('Header component test', () => {
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

});