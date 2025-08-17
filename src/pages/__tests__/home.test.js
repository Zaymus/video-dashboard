import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useAPI');
jest.mock('../../utils/env');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

import Home from '../Home';
import { render, screen, act, waitFor } from '@testing-library/react';
import { setUseAPIMock, loadingMock, errorMock, defaultResult, moreVideosMock, responsiveMock } from '../../hooks/useAPI';

let scrollY;
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, configurable: true, value: 3000 });
Object.defineProperty(window, 'scrollY', { configurable: true, get: () => scrollY});

describe('Home Page', () => {
  beforeEach(() => {
    scrollY = 0;
    window.innerWidth = 1920;
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
    setUseAPIMock(undefined);
    const { container } = render(<Home />);

    await waitFor(() => {
      defaultResult.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    
    act(() => {
      setUseAPIMock(moreVideosMock);
      scrollY = 2000;
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      moreVideosMock.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });

  test('Matches snapshot in small mobile view', async () => {
    setUseAPIMock(responsiveMock);
    window.innerWidth = 375;
    const { container } = render(<Home />);

    await waitFor(() => {
      responsiveMock.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });

  test('Matches snapshot in large mobile view', async () => {
    setUseAPIMock(responsiveMock);
    window.innerWidth = 425;
    const { container } = render(<Home />);

    await waitFor(() => {
      responsiveMock.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });

  test('Matches snapshot in tablet view', async () => {
    setUseAPIMock(responsiveMock);
    window.innerWidth = 768;
    const { container } = render(<Home />);

    await waitFor(() => {
      responsiveMock.result.items.forEach(video => {
        expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
      });
    });
    expect(container).toMatchSnapshot();
  });
});