import http from 'http';
import app from './app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start the server: ', err);
    process.exit(1);
  }
}

startServer();
