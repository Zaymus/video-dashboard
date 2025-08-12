import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import Header from '../Header/Header';

describe('Header component test', () => {
  test('matches snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  })
});