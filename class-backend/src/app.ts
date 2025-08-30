import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
