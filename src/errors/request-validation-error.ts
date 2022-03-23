import { CustomError } from "./custom-error";

/**
 * Request Validation Error
 * @returns { status: 400 }
 */
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: { message: string, field: string }[], statusCode: number) {
    super('Invalid request parameters');
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.message, field: err.field };
    });
  }
}
