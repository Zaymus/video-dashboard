import env_vars from './env';

const env = {};

for (const key in env_vars) {
  if (!key.startsWith("VITE_")) continue;
  
  if (Object.prototype.hasOwnProperty.call(env_vars, key)) {
    const newKey = key.substring(5); // removes "VITE_" from env var key
    env[newKey] = env_vars[key];
  }
};

export { env };

export const API_ENDPOINTS = {
  getVideos: '/api/youtube/v3/videos',
  searchVideos: '/api/youtube/v3/search'
}

export const isURLValid = (url) => {
  if (!url) return false;

  const endpoint = url.split('?')[0];
  return Object.values(API_ENDPOINTS).includes(endpoint);
}

const REQUEST_HEADERS = {
  headers: {
    "Content-Type": 'application/json',
    'Access-control-allow-origin': '*',
    'Access-control-allow-credentials': true
  }
};

export const POPULAR_VIDEOS_REQUEST = {
  params: {
    part: "snippet",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: "20",
    key: `${env.YOUTUBE_DATA_API_KEY}`
  },
  ...REQUEST_HEADERS
};

export const VIDEO_BY_ID_REQUEST = {
  params: {
    part: "snippet",
    type: "video",
    key: `${env.YOUTUBE_DATA_API_KEY}`
  },
  ...REQUEST_HEADERS
}

export const SEARCH_RELATED_VIDEOS_REQUEST = {
  params: {
    part: "id,snippet",
    type: "video",
    maxResults: "10",
    key: `${env.YOUTUBE_DATA_API_KEY}`
  },
  ...REQUEST_HEADERS
};

export const VIDEO_PLAYER_WIDTH_PERCENT = 2/3;
export const VIDEO_PLAYER_HEIGHT_RATIO = 9/16;
