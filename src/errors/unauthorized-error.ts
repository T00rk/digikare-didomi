import { CustomError } from './custom-error';

/**
 * Unauthorized
 * @returns { status: 401 }
 */
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Unauthorized' }];
  }
}
