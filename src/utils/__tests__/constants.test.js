import {describe, expect, test, jest} from '@jest/globals';

import { env } from '../constants'

jest.mock('../env');

describe('Constants', () => {
  describe('env object', () => {
    test('env object generated Correctly', () => {
      expect(env).toBeDefined();
      expect(Object.keys(env).length).toBeGreaterThan(0);
      expect(Object.keys(env).filter(key => key.startsWith("VITE_")).length).toBe(0);
    });
  })
});