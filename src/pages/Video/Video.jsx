import styled from "styled-components";
import VideoPlayer from "../../components/VideoPlayer";

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.25fr 1fr;
  gap: 10px; 
  height: calc(100vh - var(--header-height) - 10px);
  padding: 0 40px;

`;

const Video = () => {
  return (
    <VideoContainer>
      <VideoPlayer />
    </VideoContainer>
  )
}

export default Video;