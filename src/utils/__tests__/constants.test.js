import {describe, expect, test, jest} from '@jest/globals';

import { env, isURLValid } from '../constants'

jest.mock('../env');

describe('Constants', () => {
  describe('env object', () => {
    test('env object generated Correctly', () => {
      expect(env).toBeDefined();
      expect(Object.keys(env).length).toBeGreaterThan(0);
      expect(Object.keys(env).filter(key => key.startsWith("VITE_")).length).toBe(0);
    });
  });

  describe('isURLValid', () => {
    test('returns false when given empty param', () => {
      const result = isURLValid();
      expect(result).toBe(false);
    });
     test('returns false when given empty string', () => {
      const result = isURLValid('');
      expect(result).toBe(false);
    });
     test('returns false when given random string', () => {
      const result = isURLValid('djhasdjaks');
      expect(result).toBe(false);
    });
     test('returns false when given invalid endpoint', () => {
      const result = isURLValid('/api/youtube/creds');
      expect(result).toBe(false);
    });
     test('returns true when given correct endpoint without params', () => {
      const result = isURLValid('/api/youtube/v3/videos');
      expect(result).toBe(true);
    });
    test('returns true when given correct endpoint with params', () => {
      const result = isURLValid('/api/youtube/v3/videos?testParam=test');
      expect(result).toBe(true);
    });
  });
});