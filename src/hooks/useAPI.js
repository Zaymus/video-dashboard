import axios from 'axios';
import { useState, useEffect } from 'react';
import { isURLValid } from '../utils/constants';

const useAPI = (endpoint, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!endpoint || !isURLValid(endpoint)) {
      setHasError(`Invalid Endpoint: ${endpoint}`);
      return;
    };

    let isCancelled = false;
    setIsLoading(true);
    setHasError(false);

    axios(endpoint, config)
      .then(res => {
        if(res.status !== 200) {
          throw new Error(`HTTP Error: Status: ${res.status}`);
        }
        return res.data;
      })
      .then(data => {
        if (!isCancelled) {
          setResult(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setHasError(err.message || 'Something went wrong when calling API');
          setIsLoading(false);
        }
      });

      return () => {
        isCancelled = true;
      }
  }, [endpoint, config]);

  return { result, isLoading, hasError };
} 

export default useAPI;