import {
  DefaultError,
  QueryKey,
  UseQueryOptions,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

import { NEXT_PUBLIC_API_HOST } from '@/utils/env';

const instance = axios.create();

function useApiQuery<T>(
  url: string,
  params?: Record<string, any>,
  queryParams?: Omit<
    UseQueryOptions<Promise<T>, DefaultError, T, QueryKey>,
    'queryKey'
  >,
) {
  const { isLoading, error, data, refetch } = useQuery<
    Promise<T>,
    DefaultError,
    T,
    QueryKey
  >({
    queryKey: [url, params],
    queryFn: async (): Promise<T> => {
      const response = await instance.request<T>({
        method: 'GET',
        baseURL: NEXT_PUBLIC_API_HOST,
        url: `/api${url}`,
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    ...queryParams,
  });

  return {
    isLoading,
    error,
    data,
    refetch,
  };
}

export { useApiQuery };
