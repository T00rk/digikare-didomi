import { Request, Response, NextFunction } from 'express';
import joi, { Schema } from "joi";
import { RequestValidationError } from '../errors/request-validation-error';

/**
 * Validate request body agains joi schema
 * 
 * @param schema Joi Schema
 * @param statusCode Status code to send when error is thrown
 * @returns Go to next function | Throw new Request Validation Error (statusCode)
 */
export const validateBody = (schema: Schema, statusCode: number = 400) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });
    if(validationResult.error) {
      const errors = validationResult.error.details.map(d => { return { message: d.message.replace(/\"/gi, ''), field: d.path[0].toString() } })   
      throw new RequestValidationError(errors, statusCode);
    } else {
      return next();
    }
  };
}

/**
 * Validate request params agains joi schema
 * 
 * @param schema Joi Schema
 * @param statusCode Status code to send when error is thrown
 * @returns Go to next function | Throw new Request Validation Error (statusCode)
 */
export const validateParams = (schema: Schema, statusCode: number = 400) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.params, { abortEarly: false });
    if(validationResult.error) {
      const errors = validationResult.error.details.map(d => { return { message: d.message.replace(/\"/gi, ''), field: d.path[0].toString() } })   
      throw new RequestValidationError(errors, statusCode);
    } else {
      return next();
    }
  };
}