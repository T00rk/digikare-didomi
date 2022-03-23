import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";
import { logWrapper } from "../utils/log-wrapper";

/**
 * Custom Error Handler
 * 
 * @param err Error Data
 * @param req Express Request
 * @param res Express Response
 */
export const ErrorHandler: ErrorRequestHandler = (err: CustomError | unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    logWrapper.LogCustomError(err);
    res.status(err.statusCode).json({ status: err.statusCode, details: err.serializeErrors() });
  }
  logWrapper.LogException(err);
  res.status(500).json({ status: 500, details: [{ message: "Internal Server Error" }] });

  next();
};
