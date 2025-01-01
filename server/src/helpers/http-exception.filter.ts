import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from './dtos';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus();

    const validationResponse = exception.getResponse();
    const errorResponse: ErrorResponse = {
      statusCode: status,
      status: 'error',
      message: exception.message,
      path: request.url
    };

    if (typeof validationResponse === 'object' && 'message' in validationResponse) {
      errorResponse.error = (validationResponse as any).message;
    }

    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        errorResponse.redirect = true;
        break;
    }

    // TODO: Log the error

    response.status(status).json(errorResponse);
  }
}
