import { Suspense, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Header from "../components/Header/Header";
import Loader from '../components/common/Loader';
import useAPI from '../hooks/useAPI';
import { API_ENDPOINTS, POPULAR_VIDEOS_REQUEST } from '../utils/constants';

const Container = styled.div`
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  
  const requestConfig = useMemo(() => ({
    ...POPULAR_VIDEOS_REQUEST,
    params: {
      ...POPULAR_VIDEOS_REQUEST.params,
      pageToken: nextPageToken
    }
  }), [nextPageToken]);
  const { result, isLoading, hasError } = useAPI(API_ENDPOINTS.getVideos, requestConfig);

  useEffect(() => {
    if (result) {
      setVideos(result.items);
      setNextPageToken(prevToken =>
        prevToken === result.nextPageToken ? prevToken : result.nextPageToken
      );
    }
  }, [result])

  return (
    <Container>
        <Header />
        {isLoading ? <Loader /> : hasError ? <p>{hasError}</p> : videos.map(video => {
          return <p key={video.contentDetails.id}>{video.snippet.title}</p>;
        })}
    </Container>
  );
}

export default Home;