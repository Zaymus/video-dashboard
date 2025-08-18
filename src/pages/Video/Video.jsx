import styled from "styled-components";
import useScreenSize from "../../hooks/useScreenSize";
import VideoPlayer from "../../components/VideoPlayer";
import RelatedVideos from '../../components/RelatedVideos';

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: ${props => props.isdesktop ? '75% 25%' : '100%'};
    column-gap: ${props => props.isdesktop ? '20px' : '5px'};
    height: calc(100vh - var(--header-height) - 10px);
    padding: ${props => props.ismobile ? '0 10px' : '0 40px'};
    overflow-y: ${props => props.isdesktop ? 'visible' : 'scroll'};
  `;

const Video = () => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();

  return (
    <VideoContainer 
      isdesktop={screenSize === SCREEN_SIZES.DESKTOP}
      ismobile={screenSize === SCREEN_SIZES.MOBILE_SMALL}
    >
      <VideoPlayer />
      <RelatedVideos />
    </VideoContainer>
  )
}

export default Video;