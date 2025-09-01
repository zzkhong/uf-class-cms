import { env } from 'next-runtime-env';

export const NEXT_PUBLIC_API_HOST =
  env('NEXT_PUBLIC_API_HOST') || 'http://localhost:5000';
