import { lazy } from 'react';
import Loader from '../common/Loader';

const SearchBar = () => lazy(() => import('./SearchBar'), {fallback: <Loader />});

export default SearchBar;