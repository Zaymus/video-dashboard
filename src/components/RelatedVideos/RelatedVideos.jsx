import styled from "styled-components";
import VideoList from "../VideoList/VideoList";
import { Loader } from "../common";
import useAPI from "../../hooks/useAPI";
import { API_ENDPOINTS, SEARCH_RELATED_VIDEOS_REQUEST, VIDEO_BY_ID_REQUEST } from "../../utils/constants";
import { useEffect, useState, useMemo, useCallback } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const RelatedContainer = styled.div`
  grid-column: 4;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  height: 100%;

  h2 {
    margin: 0;
    text-align: center;
    width: 100%;
  }

  hr {
  width: 100%;
  }
`;

const RelatedVideos = ({ videoId }) => {
  const [ relatedVideos, setRelatedVideos ] = useState([]);
  const [ nextPageToken, setNextPageToken ] = useState(null);
  const [ searchQuery, setSearchQuery ] = useState([]);

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
    if (relatedVideosResult?.nextPageToken !== nextPageToken) {
      if (relatedVideosResult?.items.length > 0) {
        setRelatedVideos(relatedVideosResult.items);
        setNextPageToken(relatedVideosResult.nextPageToken);
      }
    }
  }, [relatedVideosResult]);

  const loadNextPage = useCallback(() => {
    if(!relatedVideosLoading && nextPageToken) {
      setSearchQuery(prevConfig => {
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
  }, [relatedVideosLoading, nextPageToken]);

  useInfiniteScroll({
    callback: loadNextPage,
    delay: 300,
    isLoading: relatedVideosLoading
  });
  
  return (
    <>
      {videoDetailsLoading && <Loader /> }
      {!videoDetailsLoading && 
        <RelatedContainer>
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