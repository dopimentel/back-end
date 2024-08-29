
import express, { Request, Response } from 'express';
import measuresRouter from './routers/measures.router';

const app = express();

app.use(express.json());
app.use('/upload', measuresRouter);

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send('Root page');
  });
  
  export default app;