import express, { Request, Response } from 'express';

import { errorHandler } from '@/middlewares/error.middleware';
import classRoutes from '@/routes/class.routes';
import teacherRoutes from '@/routes/teacher.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Path not found' });
});

app.use(errorHandler);

export default app;
