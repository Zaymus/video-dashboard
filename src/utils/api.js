import axios from 'axios';
import { env, POPULAR_VIDEOS_REQUEST } from './constants';

export const getPopularVideos = async (pageToken = null) => {
  if (pageToken) POPULAR_VIDEOS_REQUEST.params.pageToken = pageToken;

  try {
    const response = await axios.get(`/api${env.YOUTUBE_DATA_API_VIDEOS_ENDPOINT}`, POPULAR_VIDEOS_REQUEST);

    return response;
  } catch (error) {
    throw Error(error);
  }
}