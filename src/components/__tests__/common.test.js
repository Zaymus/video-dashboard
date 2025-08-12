import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import Loader from '../common/Loader';

describe('Common component tests', () => {
  describe('Loader', () => {
    test('matches snapshot', () => {
      const { container } = render(<Loader />);

      expect(container).toMatchSnapshot();
    })
  });
});