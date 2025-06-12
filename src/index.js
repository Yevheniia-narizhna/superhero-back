import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_URI);

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
