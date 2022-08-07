import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
class LoggingServiceMiddleware implements NestMiddleware {
  private readonly logger = new LoggerService(LoggingServiceMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, query, body } = request;
      const { statusCode, statusMessage } = response;

      const message = `method: ${method} 
      originalUrl: ${originalUrl}
      
      statusCode: ${statusCode} 
      statusMessage: ${statusMessage}`;

      return this.logger.log(message);
    });

    next();
  }
}

export default LoggingServiceMiddleware;
