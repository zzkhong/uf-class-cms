import { NextFunction, Request, Response } from 'express';
import z, { ZodError, ZodObject } from 'zod';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => `${issue.path.join('.')} is ${issue.message}`)
          .join('. ');
        res.status(400).json({ error: message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
