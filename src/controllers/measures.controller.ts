import { Request, Response } from 'express';
import measuresService from '../services/measures.service';

async function createMeasure(req: Request, res: Response) {
    // try {
    //     const measure = await measuresService.createMeasure(req.body);
    //     res.status(200).json(measure);
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
    const measure = await measuresService.createMeasure(req.body);
    res.status(200).json(measure);
}

export default { createMeasure };

