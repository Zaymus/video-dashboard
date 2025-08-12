import {describe, expect, test, jest, beforeEach} from '@jest/globals';

jest.mock('axios', () => {
  return {get: jest.fn()}
});
jest.mock('../env');

import axios from 'axios';
import { getPopularVideos } from "../api";
import { env, POPULAR_VIDEOS_REQUEST } from '../constants';


describe('API functions', () => {
  describe('getPopularVideos', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('has correct url structure', () => {
      return getPopularVideos().then(() => {
        let [endpoint, {params, headers}] = axios.get.mock.calls[0];
        
        expect(endpoint).toStrictEqual(`/api${env.YOUTUBE_DATA_API_VIDEOS_ENDPOINT}`);
        expect(params).toStrictEqual(POPULAR_VIDEOS_REQUEST.params);
        expect(headers).toStrictEqual(POPULAR_VIDEOS_REQUEST.headers);
      })
    });

    test('returns object', () => {
      axios.get.mockResolvedValue({});
      return getPopularVideos().then(response => {
        expect(response).toStrictEqual({});
      });
    });

    test('includes page token when provided', () => {
      return getPopularVideos('testPageToken').then(() => {
        let params = axios.get.mock.calls[0][1].params;
        expect(params.pageToken).not.toBeNull();
        expect(params.pageToken).toEqual('testPageToken');
      });
    });

    test('throws error when API call fails', async () => {
      const mockError = new Error('mockError');
      let error;
      axios.get.mockRejectedValue(mockError);
     
      try {
        await getPopularVideos();
      } catch (err) {
        error = err
      }

      expect(error).toEqual(new Error(mockError));
    });
  });
});