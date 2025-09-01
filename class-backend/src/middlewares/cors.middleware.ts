import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.CORS_ALLOW_HOST,
  methods: ['GET', 'POST'],
});
