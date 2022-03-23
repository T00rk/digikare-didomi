import { CustomError } from './custom-error';

/**
 * Data Not Found Error
 * @returns { status: 404 }
 */
export class DataNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Data not found');
    Object.setPrototypeOf(this, DataNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Data not found' }];
  }
}
