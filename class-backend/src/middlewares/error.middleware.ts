import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import { AppError } from '@/utils/error-handler';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join('. ');
    return res.status(400).json({ error: message });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Duplicate entry not allowed' });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal Server Error' });
};
