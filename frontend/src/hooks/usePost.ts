import { FetchOptions, FetchResponse } from '@/types/commonApi';
import { useState } from 'react';

const usePost = <Data>({
  path,
  onCompleted,
  onError,
}: FetchOptions<Data>): [(data: Record<string, unknown>) => Promise<void>, FetchResponse<Data>] => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchResponse<Data>['error'] | unknown>(null);
  const [data, setData] = useState<FetchResponse<Data>['data']>(null);

  const post = async (data: Record<string, unknown>) => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
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

  return [post, { loading, data, error }];
};

export default usePost;
