import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
  private readonly loggerService = new LoggerService(LoggerService.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.loggerService.error(exception.getResponse());
    }

    super.catch(exception, host);
  }
}
