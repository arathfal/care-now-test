import { FetchOptions, FetchResponse } from '@/types/commonApi';
import { useEffect, useState } from 'react';

const useGet = <Data>({ path, onCompleted, onError }: FetchOptions<Data>): FetchResponse<Data> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchResponse<Data>['error'] | unknown>(null);
  const [data, setData] = useState<FetchResponse<Data>['data']>(null);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const requestOptions = {
        method: 'GET',
        headers,
      };

      try {
        const response = await fetch(`http://localhost:3000/api/${path}`, requestOptions);
        const result = await response.json();
        if (!response?.ok) {
          onError && onError(result?.errors);
        } else {
          onCompleted && onCompleted(result?.data);
          setData(result);
        }
      } catch (error) {
        onError && onError(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data, error };
};

export default useGet;
