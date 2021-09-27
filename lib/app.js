import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import routes from './controllers/comments.js';

const app = express();

app.use(express.json());

app.use('api/v1/comments', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
