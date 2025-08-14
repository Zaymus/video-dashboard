import styled from "styled-components";

const FullScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &.fitHeader {
    height: calc(100vh - 75px);
  }
`;

const Fullscreen = (props) => {
  return <FullScreen {...props}>{props.children}</FullScreen>
};

export default Fullscreen;