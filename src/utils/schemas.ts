import Joi from "joi";


// type BodyUploadMeasure = {
//     image: string; // base64 - missing validation
//     customer_code: string; // missing validation
//     measure_datetime: Date; // missing validation datetime
//     measure_type: 'WATER' | 'GAS'; // missing validation
// }

// the first part of the regex is to check if the string is a image/type MIME
// the last part of the regex is to check if the string is a multiple of 4
// https://pt.stackoverflow.com/questions/231880/como-verificar-se-uma-string-esta-codificada-em-base64 

const base64ImageRegex = /^data:image\/(png|jpeg|webp|heic|heif);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
// const base64ImageRegex = /^data:image\/(png|jpeg|webp|heic|heif);base64,[A-Za-z0-9+/]+={0,2}$/;

const uploadSchema = Joi.object({
    image: Joi.string().pattern(base64ImageRegex).required().messages({
        'string.pattern.base': 'Image must be a valid base64',
        'string.empty': 'Image is required',
        'any.required': 'Image is required',
    }),
    customer_code: Joi.string().required(),
    measure_datetime: Joi.date().iso().required().messages({
        'date.base': 'Date must be a valid date',
        'date.format': 'Date must be a valid date',
        'date.iso': 'Date must be a valid date',
        'date.empty': 'Date is required',
        'any.required': 'Date is required',
    }),
    measure_type: Joi.string().valid('WATER', 'GAS').required().messages({
        'string.base': 'Type must be a valid string',
        'string.valid': 'Type must be a valid type',
        'string.empty': 'Type is required',
        'any.required': 'Type is required',
        'any.only': 'Type must be GAS or WATER',
    }),
})


export default { uploadSchema };
