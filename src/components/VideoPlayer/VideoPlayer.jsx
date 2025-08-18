import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router'
import styled from 'styled-components';
import useScreenSize from '../../hooks/useScreenSize';

  const PlayerContainer = styled.div`
    grid-column: 1;
    margin-bottom: ${props => props.ismobile ? '20px' : '0'};
    display: flex;
    justify-content: center;
  `;

  const PlayerWrapper = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
  `;

  const Player = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `;

const VideoPlayer = () => {
  const { screenSize, SCREEN_SIZES } = useScreenSize();

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const [ wrapperSize, setWrapperSize ] = useState({width: 0, height: 0});
  const { videoId } = useParams();

  const resizeHandler = () => {
    const width = containerRef.current.offsetWidth;
    const playerWidth = width;
    const playerHeight = width * (9/16);
    setWrapperSize({width: playerWidth, height: playerHeight});
  }

  

  useEffect(() => {
    if (containerRef && playerRef) {
      window.addEventListener('resize', resizeHandler);
    }

    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [screenSize]);

  useEffect(() => {
    if(!videoId) return;

    if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
      ytPlayerRef.current.loadVideoById(videoId);
      return;
    }

    const createPlayer = () => {
      ytPlayerRef.current = new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: { controls: 1 }
      });
    };
    
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [videoId]);

  return (
    <PlayerContainer
      ref={containerRef}
      ismobile={screenSize !== SCREEN_SIZES.DESKTOP}
    >
      <PlayerWrapper
        width={wrapperSize.width}
        height={wrapperSize.height}
        id="player-wrapper"
      >
        <Player id="player" ref={playerRef} />
      </PlayerWrapper>
    </PlayerContainer>
  );
}

export default VideoPlayer;