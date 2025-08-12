import { jest, describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import Home from '../Home';

jest.mock('../../utils/env');
jest.mock('../../utils/api', () => {
  return {
    ...jest.requireActual('../../utils/api'),
    getPopularVideos: jest.fn(() => {
      return {data: {nextPageToken: null}}
    })
  }
});
describe('Home Page', () => {
  test('matches snapshot', () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});