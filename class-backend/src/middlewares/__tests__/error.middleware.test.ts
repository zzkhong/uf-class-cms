import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { AppError } from '@/utils/error-handler';

import { errorHandler } from '../error.middleware';

describe('errorHandler middleware', () => {
  const setupApp = (
    throwErr: (req: Request, res: Response, next: NextFunction) => void,
  ) => {
    const app = express();
    app.get('/', throwErr);
    app.use(errorHandler);
    return app;
  };

  it('should handle Sequelize ValidationError', async () => {
    const app = setupApp((req, res, next) => {
      next(
        new ValidationError('Validation failed', [
          {
            message: 'name cannot be null',
            path: ['name'],
            value: null,
          } as any,
        ]),
      );
    });

    const res = await request(app).get('/');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'name cannot be null' });
  });

  it('should handle SequelizeUniqueConstraintError', async () => {
    const app = setupApp((req, res, next) => {
      const err = new Error('Unique constraint') as any;
      err.name = 'SequelizeUniqueConstraintError';
      next(err);
    });

    const res = await request(app).get('/');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Duplicate entry not allowed' });
  });

  it('should handle AppError', async () => {
    const app = setupApp((req, res, next) => {
      next(new AppError('Custom error', 418));
    });

    const res = await request(app).get('/');
    expect(res.status).toBe(418);
    expect(res.body).toEqual({ error: 'Custom error' });
  });

  it('should handle generic errors', async () => {
    const app = setupApp((req, res, next) => {
      next(new Error('Something went wrong'));
    });

    const res = await request(app).get('/');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
