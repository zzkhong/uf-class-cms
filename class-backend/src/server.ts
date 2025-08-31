import 'dotenv/config';
import http from 'http';

import { sequelize } from '@/database/config/database';

import app from './app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('DB Connected!');

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start the server: ', err);
    process.exit(1);
  }
}

startServer();
