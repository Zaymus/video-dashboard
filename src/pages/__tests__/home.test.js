import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useAPI');
jest.mock('../../utils/env');

import Home from '../Home';
import { render, screen } from '@testing-library/react';
import { setUseAPIMock, loadingMock, errorMock, defaultResult } from '../../hooks/useAPI';

describe('Home Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  test('renders videos from useAPI result', () => {
    setUseAPIMock(undefined);
    const { container } = render(<Home />);

    defaultResult.result.items.forEach(video => {
      expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
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
});