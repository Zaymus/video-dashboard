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

const REQUEST_HEADERS = {
  headers: {
    "Content-Type": 'application/json',
    'Access-control-allow-origin': '*',
    'Access-control-allow-credentials': true
  }
}

export const POPULAR_VIDEOS_REQUEST = {
  params: {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: "10",
    key: `${env.YOUTUBE_DATA_API_KEY}`
  },
  ...REQUEST_HEADERS
}
