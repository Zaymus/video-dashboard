import styled from "styled-components";
import useScreenSize from "../../hooks/useScreenSize";
import VideoPlayer from "../../components/VideoPlayer";
import RelatedVideos from '../../components/RelatedVideos';

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: ${props => props.isDesktop ? '75% 25%' : '100%'};
    column-gap: ${props => props.isDesktop ? '20px' : '5px'};
    height: calc(100vh - var(--header-height) - 10px);
    padding: ${props => props.isMobile ? '0 10px' : '0 40px'};
    overflow-y: ${props => props.isDesktop ? 'visible' : 'scroll'};
  `;

const Video = () => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();

  return (
    <VideoContainer 
      isDesktop={screenSize === SCREEN_SIZES.DESKTOP}
      isMobile={screenSize === SCREEN_SIZES.MOBILE_SMALL}
    >
      <VideoPlayer />
      <RelatedVideos />
    </VideoContainer>
  )
}

export default Video;