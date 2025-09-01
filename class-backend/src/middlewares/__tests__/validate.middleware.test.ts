import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { validate } from '../validate.middleware';

describe('validate middleware', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    email: z.email('Invalid email address'),
  });

  const setupApp = () => {
    const app = express();
    app.use(express.json());

    app.post('/test', validate(schema), (req: Request, res: Response) => {
      res.status(200).json({ data: req.body });
    });

    return app;
  };

  it('should pass validation for correct payload', async () => {
    const app = setupApp();
    const payload = { name: 'Alice', email: 'alice@example.com' };

    const res = await request(app).post('/test').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: payload });
  });

  it('should fail validation for empty name', async () => {
    const app = setupApp();
    const payload = { name: '', email: 'alice@example.com' };

    const res = await request(app).post('/test').send(payload);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Name cannot be empty' });
  });

  it('should fail validation for invalid email', async () => {
    const app = setupApp();
    const payload = { name: 'Alice', email: 'invalid-email' };

    const res = await request(app).post('/test').send(payload);
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid email address' });
  });

  it('should return 500 if an unexpected error occurs', async () => {
    const schemaMock: any = {
      parse: () => {
        throw new Error('Unexpected');
      },
    };
    const app = express();
    app.use(express.json());
    app.post('/test', validate(schemaMock), (req, res) =>
      res.status(200).json({}),
    );

    const res = await request(app).post('/test').send({});
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});
