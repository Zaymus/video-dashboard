import { useEffect, useState, Suspense, useCallback } from 'react';
import Loader from '../../components/common/Loader';
import VideoCard from '../../components/VideoCard';
import useAPI from '../../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../../utils/constants';
import styled from 'styled-components';
import { Fullscreen } from '../../components/common';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useScreenSize from '../../hooks/useScreenSize';

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
  const screenSize = useScreenSize();

  useEffect(() => {
    if (result && result.nextPageToken !== nextPageToken) {
      setNextPageToken(result.nextPageToken);
      setVideos(prev => [...prev, ...result.items]);
    }
  }, [result])

  const loadNextPage = useCallback(() => {
    if(!isLoading && nextPageToken) {
      setRequestConfig(prevConfig => {
        if (prevConfig.params?.pageToken === nextPageToken) return prevConfig;

        return {
          ...prevConfig,
          params: {
            ...prevConfig.params,
            pageToken: nextPageToken
          }
        };
      });
    }
  }, [isLoading, nextPageToken]);

  useInfiniteScroll({
    callback: loadNextPage,
    delay: 300,
    isLoading
  });

  return (
    <Suspense fallback={<Fullscreen className="fitHeader"><Loader /></Fullscreen>}>
      <VideosContainer>
        {
          videos.length > 0 && videos.map(video => {
            return <VideoCard 
              id={video.id}
              title={video.snippet.title}
              thumbnails={video.snippet.thumbnails}
              cardsPerRow={screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 3 : 5}
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