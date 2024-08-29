import { Router } from 'express';
import measuresController from '../controllers/measures.controller';
import validation from '../middlewares/validation';

const measuresRouter = Router();

measuresRouter.get('/upload', (_req, res) => {
    res.status(200).send('Measures page');
}
);

measuresRouter.post('/upload', validation.validateUpload, measuresController.createMeasure);

export default measuresRouter;