import { CustomError } from './custom-error';

/**
 * Invalid Credentials Error
 * @returns { status: 404 }
 */
export class InvalidCredentialsError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Invalid Email or Password');
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Invalid Email or Password' }];
  }
}
