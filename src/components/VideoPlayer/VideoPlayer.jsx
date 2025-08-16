import { useRef, useEffect } from 'react';
import { useParams } from 'react-router'
import { env, VIDEO_PLAYER_HEIGHT_RATIO, VIDEO_PLAYER_WIDTH_PERCENT } from '../../utils/constants';
import styled from 'styled-components';
import RelatedVideos from '../RelatedVideos/RelatedVideos';

const PlayerContainer = styled.div`
  grid-column: 1 / 3;
`;

const Player = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const { videoId } = useParams();

  const resizeHandler = () => {
    const playerWidth = window.innerWidth * VIDEO_PLAYER_WIDTH_PERCENT;
    const playerHeight = playerWidth * VIDEO_PLAYER_HEIGHT_RATIO;

    containerRef.current.style.width = `${playerWidth}px`;
    containerRef.current.style.height = `${playerHeight}px`;
  }

  useEffect(() => {
    if (containerRef) {
      window.addEventListener('resize', resizeHandler);
    }

    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  useEffect(() => {
    if(!videoId) return;

    if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) ytPlayerRef.current.loadVideoById(videoId);

    const scriptTags = [...document.getElementsByTagName('script')];
    const youtubeScript = scriptTags.filter((script) => {
      return script.src === env.YOUTUBE_IFRAME_API_URL;
    });
    
    if(youtubeScript.length == 0) {
      let tag = document.createElement('script');
      tag.src = env.YOUTUBE_IFRAME_API_URL;
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          controls: 1
        }
      })
    }
  }, [videoId]);

  return (
    <>
      <PlayerContainer ref={containerRef}>
        <Player id="player" ref={playerRef}/>
      </PlayerContainer>
      <RelatedVideos videoId={videoId}/>
    </>
  );
}

export default VideoPlayer;