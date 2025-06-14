import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import cookieParser from 'cookie-parser';
// import allRouters from './routers/index.js';
// import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';

const app = express();

app.use(
  cors({
    origin: 'https://superhero-front.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(router);

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );
// закоментовано для розробки

app.get('/', (req, res) => {
  res.json({
    message: 'Start page!',
  });
});

app.use('*', notFoundHandler);

app.use(errorHandler);

const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
