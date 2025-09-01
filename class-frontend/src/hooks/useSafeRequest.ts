import { DefaultError, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { NEXT_PUBLIC_API_HOST } from '@/constants/env.constant';

const instance = axios.create();

function useSafeRequest<T, R>() {
  const { mutateAsync, isPending } = useMutation<
    R,
    DefaultError,
    { url: string; method: 'POST' | 'PUT'; data: T }
  >({
    mutationFn: async ({ url, method, data }) => {
      const response = await instance.request<R>({
        method,
        baseURL: NEXT_PUBLIC_API_HOST,
        url: `/api${url}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    },
  });

  return {
    isPending,
    request: mutateAsync,
  };
}

export { useSafeRequest };
