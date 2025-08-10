import { lazy } from 'react';
import Loader from '../common/Loader';

const VideoPlayer = () => lazy(() => import('./VideoPlayer'), {fallback: <Loader />});

export default VideoPlayer;