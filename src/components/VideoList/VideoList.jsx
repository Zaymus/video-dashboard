import { useRef } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import VideoCard from "../VideoCard";
import styled from "styled-components";

  const VideoListContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'row' : 'column'};
    flex-wrap: ${props => props.isMobile ? 'wrap' : 'nowrap'};
    align-items: center;
    height: calc(100vh - var(--header-height) - 10px);
    overflow-y: ${props => props.isDesktop ? 'scroll' : 'visible'};
  `;


const VideoList = ({ videos }) => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();
  const containerRef = useRef(null);

  return (
    <VideoListContainer
      ref={containerRef}
      isMobile={[SCREEN_SIZES.MOBILE_SMALL, SCREEN_SIZES.MOBILE_LARGE, SCREEN_SIZES.TABLET].includes(screenSize)}
      isDesktop={screenSize === SCREEN_SIZES.DESKTOP}
    >
      {
        videos?.length > 0 && videos.map(video => {
          return <VideoCard 
            key={video.id.videoId}
            id={video.id.videoId}
            title={video.snippet.title}
            thumbnails={video.snippet.thumbnails}
            cardsPerRow={screenSize === SCREEN_SIZES.TABLET ? 3 : 1}
          />;
        })
      }
    </VideoListContainer>
  )
};

export default VideoList;