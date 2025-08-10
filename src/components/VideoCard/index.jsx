import { lazy } from 'react';
import Loader from '../common/Loader';

const VideoCard = () => lazy(() => import('./VideoCard'), {fallback: <Loader />});

export default VideoCard;