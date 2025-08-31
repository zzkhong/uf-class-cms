import express, { Request, Response } from 'express';

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

// Generic error
app.use((err: any, req: Request, res: Response) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
