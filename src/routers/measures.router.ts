import { Router } from 'express';
import measuresController from '../controllers/measures.controller';

const measuresRouter = Router();

measuresRouter.get('/', (_req, res) => {
    res.status(200).send('Measures page');
}
);

measuresRouter.post('/', measuresController.createMeasure);

export default measuresRouter;