import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  commingFrom: string; //elastic, redis, kibana ...
  serializedError(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  commingFrom: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  commingFrom: string;

  constructor(message: string, commingFrom: string) {
    super(message);
    this.commingFrom = commingFrom;
  }

  serializedError(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      commingFrom: this.commingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
