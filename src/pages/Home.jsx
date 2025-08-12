import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from "../components/Header/Header";
import { getPopularVideos } from '../utils/api';

const Container = styled.div`
`;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getPopularVideos(nextPageToken);

      if (nextPageToken === result.data.nextPageToken) return;
      
      setVideos(result.data.items);
    }

    fetchData();

    return () => {
      setVideos([]);
      setNextPageToken(null);
    }
  }, []);

  return (
    <Container>
        <Header />
    </Container>
  );
}

export default Home;