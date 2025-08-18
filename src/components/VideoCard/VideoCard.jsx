import styled from "styled-components";
import Thumbnail from '../Thumbnail';
import Loader from "../common/Loader";
import { Suspense } from "react";
import { useNavigate } from "react-router";

const Title = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  white-space: pre-wrap;
  margin-top: 5px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(var(--videos-usable-width) / ${props => props.cardsPerRow} - var(--videos-gutter-margin) - 0.1px);
  cursor: pointer;
  border-radius: 15px;
  padding: 20px;

  &:hover {
    background-color: var(--border-dark);
  }
`;

const VideoCard = ({ id, title, thumbnails, cardsPerRow=5 }) => {

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/video/${id}`);
  };

  return (
    <Card key={id} onClick={clickHandler} role="link" aria-description={title} tabIndex={0} cardsPerRow={cardsPerRow}>
      <Suspense fallback={<Loader />}>
        <Thumbnail thumbnails={thumbnails} />
      </Suspense>
      <Title>{title}</Title>
    </Card>
  );
}

export default VideoCard;