import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useAPI');
jest.mock('../../utils/env');

import Home from '../Home';
import { render, screen, act, waitFor } from '@testing-library/react';
import { setUseAPIMock, loadingMock, errorMock, defaultResult } from '../../hooks/useAPI';
import { moreVideosMock } from '../../hooks/__mocks__/useAPI';

describe('Home Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  test('renders videos from useAPI result', async () => {
    setUseAPIMock(undefined);
    const { container } = render(<Home />);

    await waitFor(() => {
      defaultResult.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });

  test('shows loader when isLoading is true', () => {
    setUseAPIMock(loadingMock);

    const { container } = render(<Home />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('shows error message when hasError is set', () => {
    setUseAPIMock(errorMock);

    const { container } = render(<Home />);
    expect(screen.getByText('API error')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

   test('renders additional videos from useAPI result when scrollbar is at bottom', async () => {
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, configurable: true, value: 3000 });
    setUseAPIMock(undefined);
    const { container } = render(<Home />);

    await waitFor(() => {
      defaultResult.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    
    act(() => {
      setUseAPIMock(moreVideosMock);
      window.scrollY = 2000;
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      moreVideosMock.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });
});