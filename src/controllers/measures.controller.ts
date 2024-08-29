import { Request, Response } from 'express';
import measuresService from '../services/measures.service';

async function createMeasure(req: Request, res: Response) {
    // try {
    //     const measure = await measuresService.createMeasure(req.body);
    //     res.status(200).json(measure);
    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
    const serviceResponse = await measuresService.createMeasure(req.body);
    if (serviceResponse.success) {
        return res.status(200).json({
            ...serviceResponse.data,
        });
    }
    if (serviceResponse.data.error_code === 'INVALID_DATA') {
        return res.status(400).json({
            ...serviceResponse.data,
        });
    }
    return res.status(409).json({
        ...serviceResponse.data,
    });
}

export default { createMeasure };

