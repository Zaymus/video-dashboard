import VideoCard from "../VideoCard";
import styled from "styled-components";

const VideoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const VideoList = ({ videos }) => {

  return (
    <VideoListContainer>
      {
        videos?.length > 0 && videos.map(video => {
          return <VideoCard 
            id={video.id.videoId}
            title={video.snippet.title}
            thumbnails={video.snippet.thumbnails}
            cardsPerRow={1}
          />;
        })
      }
    </VideoListContainer>
  )
};

export default VideoList;