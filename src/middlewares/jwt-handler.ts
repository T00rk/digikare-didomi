import { Request, Response, NextFunction } from 'express';

import { COOKIE_KEY } from "./../config";
import { UnauthorizedError } from '../errors/unauthorized-error';
import { UserPayload, VerifyToken } from "./../utils/jwt-wrapper";

declare global {
  namespace Express {
    interface Request {
      jwt?: string;
      jwtPayload?: UserPayload
    }
  }
}

/**
 * Decode JWT from cookie and store it into request
 * 
 * @param req Express Request
 * @param res Express Response
 * @param next Express Next Function
 * @returns Go to next function
 */
export const ParseJWT = (req: Request, res: Response, next: NextFunction) => {

  const authorizationToken = req?.cookies[COOKIE_KEY];

  try {
    if(authorizationToken) {
      req.jwt = authorizationToken;
      req.jwtPayload = VerifyToken(authorizationToken) as UserPayload;
    }    
  } catch (ex){
    console.log(ex);
  }

  return next();
  
};

/**
 * Require JWT to be set in request
 * 
 * @param req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 * @returns Go to next function | throws new Unauthorized Error (403)
 */
export const RequireJWT = (req: Request, res: Response, next: NextFunction) => {

  if(!req.jwtPayload || !req.jwt) {
    throw new UnauthorizedError();
  } else {
    return next();
  }

}
