import MeasureModel, { MeasureInputtableFields } from "../database/models/measure.model";
import { Measure } from "../types/Measure";
import geminiService from "./gemini.service";
import { v4 as uuidv4 } from 'uuid';
import { MeasureSequelizeModel } from "../database/models/measure.model";
import CustomerModel from "../database/models/customer.model";
import { ServiceResponse } from "../types/ServiceResponse";


type BodyUploadMeasure = {
    image: string; // base64 - missing validation
    customer_code: string; // missing validation
    measure_datetime: Date; // missing validation datetime
    measure_type: 'WATER' | 'GAS'; // missing validation
}

type UploadMeasureReturn = {
    image_url: string; // missing validation
    measure_value: number; // MUST BE A INTEGER - value from mockGeminiReturn
    measure_uuid: string; // created by uuidv4
}

async function createMeasure(body: BodyUploadMeasure): Promise<ServiceResponse<UploadMeasureReturn>> {
    const { image, customer_code, measure_datetime, measure_type } = body;
    const customer = await CustomerModel.findOne({
        where: {
            customer_code,
        },
    });
    if (!customer) {
        CustomerModel.create({
            customer_code,
        });

    }

    const measureExists = await MeasureModel.findOne({
        where: {
            customer_code,
            measure_type,
        },
    });

    if (measureExists) {
        return {
            success: false,
            data: { 
                error_code: "DOUBLE_REPORT", 
                error_description: "Leitura do mês já realizada"
            }
        }
    }


    const serviceResponse = await geminiService.runGemini(image);
    if (!serviceResponse.success) {
        return {
            success: false,
            data: {
                error_code: "INVALID_DATA",
                error_description: "Invalid base64 image",
            }
        }
    }
    const { image_url, measure_value } = serviceResponse.data;

    const measure = await MeasureModel.create({
        measure_uuid: uuidv4(),
        measure_datetime: new Date(measure_datetime),
        measure_type,
        has_confirmed: false,
        image_url,
        customer_code,
        measure_value,
        
    });
    return {
        success: true,
        data: {
            image_url: measure.dataValues.image_url,
            measure_value: measure.dataValues.measure_value,
            measure_uuid: measure.dataValues.measure_uuid,
        }
    };
}

export default { createMeasure };
