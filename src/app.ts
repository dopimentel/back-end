require('dotenv').config();
import express, { Request, Response } from 'express';
import measuresRouter from './routers/measures.router';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(measuresRouter);

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('Root page');
  });
  
  export default app;