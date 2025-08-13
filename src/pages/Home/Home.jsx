import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import VideoCard from '../../components/VideoCard';
import useAPI from '../../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../../utils/constants';
import useScrollBar from '../../hooks/useScrollBottom';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [requestConfig, setRequestConfig] = useState(POPULAR_VIDEOS_REQUEST);
  const { result, isLoading, hasError } = useAPI(API_ENDPOINTS.getVideos, requestConfig);
  const isAtBottom = useScrollBar(20);

  useEffect(() => {
    if (result) {
      setNextPageToken(result.nextPageToken);
      setVideos(prevVideos => {
        return prevVideos?.length > 0 ? [...prevVideos, ...result.items] : [...result.items];
      });
    }
  }, [result])

  useEffect(() => {
    if (isAtBottom) {
      setRequestConfig(prevConfig => ({
        ...prevConfig,
        params: {
          ...prevConfig.params,
          pageToken: nextPageToken
        }
      }))
    }
  }, [isAtBottom, nextPageToken]);

  return (
    <>
        {
          videos.length > 0 && videos.map(video => {
            return <VideoCard 
              id={video.id}
              title={video.snippet.title}
              thumbnailURL={video.snippet.thumbnails.standard.url}
            />;
          })
        }
        { isLoading == true && <Loader /> }
        { hasError && <p>{ hasError }</p>}
    </>
  );
}

export default Home;