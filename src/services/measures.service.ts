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

async function confirmMeasure(measure_uuid: string, confirmed_value: number): Promise<ServiceResponse<Measure>> {
    const measure = await MeasureModel.findOne({
        where: {
            measure_uuid,
        },
    });

    if (!measure) {
        return {
            success: false,
            data: {
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura do mês já realizada",
            }
        }
    }

    if (measure.dataValues.has_confirmed) {
        return {
            success: false,
            data: {
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura do mês já realizada",
            }
        }
    }

    const updatedMeasure = await MeasureModel.update({
        has_confirmed: true,
        measure_value: confirmed_value,
    }, {
        where: {
            measure_uuid,
        },
        returning: true,
    });
    
    const res = await MeasureModel.findOne({
        where: {
            measure_uuid,
        },
    });

    const data = {
        ...res?.dataValues,
    } as Measure;

    return {
        success: true,
        data,
    }
}

export default { createMeasure, confirmMeasure };
