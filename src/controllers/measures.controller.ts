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

async function confirmMeasure(req: Request, res: Response) {
    const { measure_uuid, confirmed_value } = req.body;
    const serviceResponse = await measuresService.confirmMeasure(measure_uuid, confirmed_value);
    if (serviceResponse.success) {
        return res.status(200).json({
            success: true,
        });
    }
    if (serviceResponse.data.error_code === 'MEASURE_NOT_FOUND') {
        return res.status(404).json({
            ...serviceResponse.data,
        });
    }
    return res.status(409).json({
        ...serviceResponse.data,
    });
}

export default { createMeasure, confirmMeasure };

