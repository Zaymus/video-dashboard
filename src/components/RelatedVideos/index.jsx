import { lazy } from 'react';
import Loader from '../common/Loader';

const RelatedVideos = () => lazy(() => import('./RelatedVideos'), {fallback: <Loader />});

export default RelatedVideos;