import { Request, Response, NextFunction } from 'express';
import schemas from '../utils/schemas';


function validateUpload(req: Request, res: Response, next: NextFunction) {
  const { error } = schemas.uploadSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ 
        error_code: "INVALID_DATA",
        error_description: error.message
    });
  }
  next();
}

function validateConfirm(req: Request, res: Response, next: NextFunction) {
  const { error } = schemas.confirmSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error_code: "INVALID_DATA",
      error_description: error.message
  });
  }
  next();
}


// function validateBody(schema: Joi.ObjectSchema) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }
//     next();
//   };
// }

export default { validateUpload, validateConfirm };
