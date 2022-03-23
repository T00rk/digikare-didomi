import { CustomError } from "./custom-error";

/**
 * Unprocessable Entity Error
 * @returns { status: 422 }
 */
 export class UnprocessableEntityError extends CustomError {
  statusCode = 422;

  constructor() {
    super('Unprocessable Entity');
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Unprocessable Entity' }];
  }
}
