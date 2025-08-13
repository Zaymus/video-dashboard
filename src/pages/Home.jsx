import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/common/Loader';
import useAPI from '../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../utils/constants';
import useScrollBar from '../hooks/useScrollBottom';

const Container = styled.div`
  margin-top: 75px;
  padding: 10px 20px;
`;

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
    <Container id="homeContainer">
        {
          videos.length > 0 && videos.map(video => {
            return <p key={video.contentDetails.id}>{video.snippet.title}</p>;
          })
        }
        { isLoading == true && <Loader /> }
        { hasError && <p>{ hasError }</p>}
    </Container>
  );
}

export default Home;