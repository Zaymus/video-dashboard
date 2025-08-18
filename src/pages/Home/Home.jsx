import { useEffect, useState, Suspense, useCallback } from 'react';
import Loader from '../../components/common/Loader';
import VideoCard from '../../components/VideoCard';
import useAPI from '../../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../../utils/constants';
import styled from 'styled-components';
import { Fullscreen } from '../../components/common';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useScreenSize from '../../hooks/useScreenSize';

const Home = () => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();
  const VideosContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-wrap: wrap;
    flex-direction: ${props => props.isMobile ? 'column' : 'row'};
    align-items: ${props => props.isMobile ? 'center' : 'flex-start'};
    justify-content: ${props => !props.isMobile ? 'center' : 'flex-start'};
  `;

  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [requestConfig, setRequestConfig] = useState(POPULAR_VIDEOS_REQUEST);
  const { result, isLoading, hasError } = useAPI(API_ENDPOINTS.getVideos, requestConfig);

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
      <VideosContainer isMobile={screenSize === SCREEN_SIZES.MOBILE_SMALL}>
        {
          videos.length > 0 && videos.map(video => {
            return <VideoCard 
              key={video.id}
              id={video.id}
              title={video.snippet.title}
              thumbnails={video.snippet.thumbnails}
              cardsPerRow={screenSize === SCREEN_SIZES.MOBILE_SMALL ? 1 : screenSize === SCREEN_SIZES.MOBILE_LARGE ? 2 : screenSize === SCREEN_SIZES.TABLET ? 3 : 5}
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