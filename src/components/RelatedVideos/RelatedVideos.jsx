import styled from "styled-components";
import VideoList from "../VideoList/VideoList";
import { useParams } from 'react-router'
import { Loader } from "../common";
import useAPI from "../../hooks/useAPI";
import { API_ENDPOINTS, SEARCH_RELATED_VIDEOS_REQUEST, VIDEO_BY_ID_REQUEST } from "../../utils/constants";
import { useEffect, useState, useMemo } from "react";
import useScreenSize from "../../hooks/useScreenSize";

const RelatedContainer = styled.div`
    grid-column: ${props => props.isDesktop ? '2' : '1' };
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height) - 10px);

    h2 {
      margin: 0;
      text-align: center;
      width: 100%;
    }

    hr {
    width: 100%;
    }
  `;

const RelatedVideos = () => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();

  const [ relatedVideos, setRelatedVideos ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState([]);
  const { videoId } = useParams();

  const config = useMemo(() => ({
    ...VIDEO_BY_ID_REQUEST,
    params: {
      ...VIDEO_BY_ID_REQUEST.params,
      id: videoId
    }
  }), [videoId]);

  const { result: videoDetails, isLoading: videoDetailsLoading } = useAPI(API_ENDPOINTS.getVideos, config);

  useEffect(() => {
    if (videoDetails?.items?.length > 0) {
      const snippet = videoDetails.items[0].snippet;
      const query = snippet.tags || [snippet.title];
      setSearchQuery(query);
    } 
  }, [videoDetails]);

  const searchRequest = useMemo(() => ({
    ...SEARCH_RELATED_VIDEOS_REQUEST,
    params: {
      ...SEARCH_RELATED_VIDEOS_REQUEST.params,
      q: searchQuery.join(',')
    }
  }), [searchQuery]);

  const { result: relatedVideosResult, isLoading: relatedVideosLoading } = useAPI(API_ENDPOINTS.searchVideos, searchRequest);

  useEffect(() => {
    if (relatedVideosResult?.items.length > 0) {
      setRelatedVideos(relatedVideosResult.items);
    }
  }, [relatedVideosResult]);
  
  return (
    <>
      {videoDetailsLoading && <Loader /> }
      {!videoDetailsLoading && 
        <RelatedContainer isDesktop={screenSize === SCREEN_SIZES.DESKTOP}>
          <h2>Related Videos</h2>
          <hr />
          {relatedVideosLoading && <Loader />}
          {relatedVideos.length > 0 && <VideoList videos={relatedVideos}/> }
        </RelatedContainer>
      }
    </>
  )
}

export default RelatedVideos;