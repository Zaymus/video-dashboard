import { useEffect, useState, Suspense } from 'react';
import Loader from '../../components/common/Loader';
import VideoCard from '../../components/VideoCard';
import useAPI from '../../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../../utils/constants';
import useScrollBar from '../../hooks/useScrollBottom';
import styled from 'styled-components';
import { Fullscreen } from '../../components/common';

const VideosContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [requestConfig, setRequestConfig] = useState(POPULAR_VIDEOS_REQUEST);
  const { result, isLoading, hasError } = useAPI(API_ENDPOINTS.getVideos, requestConfig);
  const isAtBottom = useScrollBar();

  useEffect(() => {
    if (result && result.nextPageToken !== nextPageToken) {
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
    <Suspense fallback={<Fullscreen className="fitHeader"><Loader /></Fullscreen>}>
      <VideosContainer>
        {
          videos.length > 0 && videos.map(video => {
            return <VideoCard 
              id={video.id}
              title={video.snippet.title}
              thumbnails={video.snippet.thumbnails}
            />;
          })
        }
        { isLoading == true && <Loader /> }
        { hasError && <p>{ hasError }</p>}
      </VideosContainer>
    </Suspense>
  );
}

export default Home;