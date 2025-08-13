import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';

import useAPI from '../useAPI';
import axios from 'axios';

jest.mock('../../utils/env');
jest.mock('axios');

describe('useAPI', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('returns proper states when given no endpoint', () => {
    const { result } = renderHook(() => useAPI());

    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasError).toEqual('Invalid Endpoint: undefined');
  });

  test('returns proper states when given invalid endpoint', () => {
    const { result } = renderHook(() => useAPI('test'));

    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasError).toEqual('Invalid Endpoint: test');
  });

  test('returns proper states when given valid endpoint', async () => {
    axios.mockResolvedValue({status: 200, data: 'success'});
    
    const { result } = renderHook(() => useAPI('/api/youtube/v3/videos'));

    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.hasError).toBeFalsy();
  });

  test('returns correct response from valid endpoint when call is complete', async () => {
    axios.mockResolvedValue({status: 200, data: 'success'});
    
    const { result } = renderHook(() => useAPI('/api/youtube/v3/videos'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.result).toBe('success');
    });
  });

  test('returns error on non 200 status code', async () => {
    axios.mockResolvedValue({status: 400, data: 'fail'});
    const { result } = renderHook(() => useAPI('/api/youtube/v3/videos'));

    await waitFor(() => {
      expect(result.current.hasError).toEqual("HTTP Error: Status: 400");
    });
  })

  test('destroys properly on unmount', async () => {
    axios.mockResolvedValue({status: 200, data: 'success'});
    const { unmount } = renderHook(() => useAPI('/api/youtube/v3/videos'));

    unmount();
  });

  test('destroys properly on unmount - error', async () => {
    axios.mockResolvedValue({status: 500, data: null});
    const { unmount } = renderHook(() => useAPI('/api/youtube/v3/videos'));

    unmount();
  });
});