import MeasureModel, { MeasureInputtableFields } from "../database/models/measure.model";
import mockGeminiReturn from "./mockGemini.service";
import { v4 as uuidv4 } from 'uuid';


type BodyUploadMeasure = {
    image: string; // base64 - missing validation
    customer_code: string; // missing validation
    measure_datetime: Date; // missing validation datetime
    measure_type: 'WATER' | 'GAS'; // missing validation
}

type UploadMeasureReturn = {
    image_url: string; // missing validation
    measure_value: number; // MUST BE INTEGER - value from mockGeminiReturn
    measure_uuid: string; // created by uuidv4
}


async function createMeasure(body: BodyUploadMeasure): Promise<UploadMeasureReturn> {
    const { image, customer_code, measure_datetime, measure_type } = body;
    const { image_url, measure_value } = await mockGeminiReturn(image);

    const measure = await MeasureModel.create({
        measure_uuid: uuidv4(),
        measure_datetime,
        measure_type,
        has_confirmed: false,
        image_url,
        customer_code,
        measure_value,
        
    });
    return {
        image_url: measure.dataValues.image_url,
        measure_value: measure.dataValues.measure_value,
        measure_uuid: measure.dataValues.measure_uuid,
    };
}

export default { createMeasure };
