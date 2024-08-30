require('dotenv').config();
require('express-async-errors');
import express, { Request, Response } from 'express';
import measuresRouter from './routers/measures.router';
import bodyParser from 'body-parser';
import errorMiddleware from './middlewares/error';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(measuresRouter);

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('Root page');
  });
  
app.use(errorMiddleware)
  
export default app;